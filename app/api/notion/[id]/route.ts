// app/api/notion/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getPageBlocks } from "@/app/lib/notion";

export async function GET(
    _req: NextRequest,
    { params }: { params: { id: string } }
    ) {
    try {
        const blocks = await getPageBlocks(params.id);
        return NextResponse.json({ blocks });
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}