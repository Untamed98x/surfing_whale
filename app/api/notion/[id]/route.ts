// app/api/notion/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPageBlocks } from "@/app/lib/notion";

export async function GET(
    _req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
    ) {
    try {
        const { id } = await params;
        const blocks = await getPageBlocks(id);
        return NextResponse.json({ blocks });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}