// app/lib/notion.ts

export interface NotionProject {
    id: string;
    title: string;
    link: string;
    tags: string[];
    image: string;
    }

    export async function getProjects(): Promise<NotionProject[]> {
    const res = await fetch(
        `https://api.notion.com/v1/databases/${process.env.NOTION_DATABASE_ID}/query`,
        {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
            "Notion-Version": "2022-06-28",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            filter: {
            property: "Tags",
            multi_select: { contains: "#Finished" },
            },
        }),
        next: { revalidate: 3600 },
        }
    );

    if (!res.ok) {
        console.error("Notion API error:", await res.text());
        return [];
    }

    const data = await res.json();

    return data.results.map((page: any) => ({
        id: page.id,
        title: page.properties.Name?.title?.[0]?.plain_text ?? "Untitled",
        link: page.properties.Citation?.rich_text?.[0]?.plain_text ?? "#",
        tags: page.properties.Tags?.multi_select?.map((t: any) => t.name) ?? [],
        image: page.properties.Image?.url ?? "/images/placeholder.png",
    }));
    }