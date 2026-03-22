// app/api/sync-images/route.ts
// Endpoint: POST /api/sync-images
// Bisa dipanggil manual atau via Notion webhook / cron

import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import chromium from "@sparticuz/chromium";
import puppeteer from "puppeteer-core";
import { uploadToCloudinary } from "@/app/lib/cloudinary";

const notion = new Client({ auth: process.env.NOTION_API_KEY! });
const DATABASE_ID = process.env.NOTION_DATABASE_ID!;

// Secret buat protect endpoint ini dari request random
// Tambahkan SYNC_SECRET ke env vars Vercel lo
const SYNC_SECRET = process.env.SYNC_SECRET ?? "dev-secret";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NotionProject {
    id: string;
    name: string;
    citationUrl: string | null;
    imageUrl: string | null;
    }

    interface SyncResult {
    projectId: string;
    name: string;
    status: "synced" | "skipped" | "failed";
    cloudinaryUrl?: string;
    error?: string;
    }

    // ─── Notion Helpers ───────────────────────────────────────────────────────────

    async function getProjectsNeedingSync(): Promise<NotionProject[]> {
    const response = await notion.databases.query({
        database_id: DATABASE_ID,
        // Hanya ambil project yang punya Citation URL tapi Image-nya kosong
        filter: {
        and: [
            {
            property: "Citation URL",
            url: { is_not_empty: true },
            },
            {
            property: "Image",
            files: { is_empty: true },
            },
        ],
        },
    });

    return response.results
        .filter((page): page is typeof page & { properties: Record<string, unknown> } => "properties" in page)
        .map((page) => {
        const props = page.properties as Record<string, { type: string; url?: string | null; title?: { plain_text: string }[]; files?: { file?: { url: string }; external?: { url: string } }[] }>;

        const nameRaw = props["Name"]?.title;
        const name = Array.isArray(nameRaw) && nameRaw.length > 0
            ? nameRaw[0].plain_text
            : "Untitled";

        const citationUrl = props["Citation URL"]?.url ?? null;

        const imageFiles = props["Image"]?.files;
        const imageUrl =
            Array.isArray(imageFiles) && imageFiles.length > 0
            ? (imageFiles[0]?.file?.url ?? imageFiles[0]?.external?.url ?? null)
            : null;

        return { id: page.id, name, citationUrl, imageUrl };
        });
    }

    async function updateNotionImage(pageId: string, imageUrl: string): Promise<void> {
    await notion.pages.update({
        page_id: pageId,
        properties: {
        Image: {
            files: [
            {
                name: "project-screenshot",
                type: "external",
                external: { url: imageUrl },
            },
            ],
        },
        },
    });
    }

    // ─── Screenshot via Puppeteer ─────────────────────────────────────────────────

    async function screenshotUrl(url: string): Promise<Buffer> {
    // @sparticuz/chromium works on Vercel serverless (Linux x64)
    const browser = await puppeteer.launch({
        args: chromium.args,
        defaultViewport: { width: 1280, height: 720 },
        executablePath: await chromium.executablePath(),
        headless: chromium.headless,
    });

    try {
        const page = await browser.newPage();

        // Block berat-berat resource biar screenshot lebih cepet
        await page.setRequestInterception(true);
        page.on("request", (req) => {
        const resourceType = req.resourceType();
        if (["media", "font", "websocket"].includes(resourceType)) {
            req.abort();
        } else {
            req.continue();
        }
        });

        await page.goto(url, { waitUntil: "networkidle2", timeout: 30_000 });
        await page.waitForTimeout(1500); // beri waktu JS render

        const buffer = await page.screenshot({ type: "jpeg", quality: 85 });
        return Buffer.from(buffer);
    } finally {
        await browser.close();
    }
    }

    // ─── Slug dari nama project ───────────────────────────────────────────────────

    function toSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    // ─── Main Handler ─────────────────────────────────────────────────────────────

    export async function POST(req: NextRequest): Promise<NextResponse> {
    // Auth check
    const secret = req.headers.get("x-sync-secret");
    if (secret !== SYNC_SECRET) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const projects = await getProjectsNeedingSync();

        if (projects.length === 0) {
        return NextResponse.json({
            message: "Semua project sudah punya image, tidak ada yang perlu di-sync.",
            synced: 0,
        });
        }

        const results: SyncResult[] = [];

        for (const project of projects) {
        if (!project.citationUrl) {
            results.push({ projectId: project.id, name: project.name, status: "skipped" });
            continue;
        }

        try {
            console.log(`[sync] Screenshot: ${project.name} → ${project.citationUrl}`);
            const buffer = await screenshotUrl(project.citationUrl);

            const slug = toSlug(project.name);
            console.log(`[sync] Upload Cloudinary: ${slug}`);
            const { secure_url } = await uploadToCloudinary(buffer, slug);

            console.log(`[sync] Update Notion: ${project.id}`);
            await updateNotionImage(project.id, secure_url);

            results.push({
            projectId: project.id,
            name: project.name,
            status: "synced",
            cloudinaryUrl: secure_url,
            });
        } catch (err) {
            const message = err instanceof Error ? err.message : String(err);
            console.error(`[sync] FAILED: ${project.name}`, message);
            results.push({
            projectId: project.id,
            name: project.name,
            status: "failed",
            error: message,
            });
        }
        }

        const synced = results.filter((r) => r.status === "synced").length;
        const failed = results.filter((r) => r.status === "failed").length;

        return NextResponse.json({ synced, failed, results });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: message }, { status: 500 });
    }
    }

    // GET buat health check / status endpoint
    export async function GET(): Promise<NextResponse> {
    return NextResponse.json({
        status: "ok",
        endpoint: "POST /api/sync-images",
        hint: "Include header: x-sync-secret: <SYNC_SECRET>",
    });
    }