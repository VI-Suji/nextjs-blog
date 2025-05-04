import { Client } from '@notionhq/client';
import {
    BlockObjectResponse,
    PageObjectResponse,
    RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({
    auth: process.env.NOTION_API_KEY || '', // Ensure you use an environment variable for security
});

type FormattedText = {
    text: string;
    annotations: RichTextItemResponse['annotations'];
    link: string | null;
};

type BlogContentBlock = {
    type: string;
    rich_text?: FormattedText[];
    language?: string;
    url?: string;
    caption?: string;
};

type BlogPost = {
    childPageId: string;
    title: string;
    cover: string | null;
    icon: string | null;
    createdTime: string;
    lastEditedTime: string;
    summary: string;
    readTime: string;
    author: string; // Assuming you will later handle author extraction or assignment
    content: BlogContentBlock[];
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<BlogPost | { error: string }>
) {
    const { id } = req.query;

    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Invalid post ID' });
    }

    try {
        // Fetch the page details
        const pageInfo = await notion.pages.retrieve({ page_id: id }) as PageObjectResponse;

        // Extract title (handling cases where title might be undefined or structured differently)
        const titleProp = pageInfo.properties?.['title'];
        let title = 'Untitled';
        if (titleProp && 'title' in titleProp && Array.isArray(titleProp.title)) {
            title = titleProp.title.map(t => t.plain_text).join(' ') || 'Untitled';
        }

        const createdTime = pageInfo.created_time;
        const lastEditedTime = pageInfo.last_edited_time;

        // Handle Cover Image
        let cover: string | null = null;
        if (pageInfo.cover) {
            cover =
                pageInfo.cover.type === 'external'
                    ? pageInfo.cover.external.url
                    : pageInfo.cover.file?.url || null;
        }

        // Handle Icon
        let icon: string | null = null;
        if (pageInfo.icon) {
            if (pageInfo.icon.type === 'emoji') {
                icon = pageInfo.icon.emoji;
            } else if (pageInfo.icon.type === 'external') {
                icon = pageInfo.icon.external.url;
            } else if (pageInfo.icon.type === 'file') {
                icon = pageInfo.icon.file.url;
            } else {
                icon = null; // For future types (e.g., 'custom_emoji')
            }
        }

        // Fetch content blocks
        const contentResp = await notion.blocks.children.list({
            block_id: id,
            page_size: 100, // You can adjust the page size if necessary
        });

        const blocks = contentResp.results as BlockObjectResponse[];

        const structuredContent: BlogContentBlock[] = blocks.map((block) => {
            const blockType = block.type;
            const result: BlogContentBlock = { type: blockType };

            const blockData = block[blockType as keyof BlockObjectResponse] as any;

            if (blockData.rich_text && Array.isArray(blockData.rich_text)) {
                result.rich_text = blockData.rich_text.map((t: RichTextItemResponse) => {
                    let link: string | null = null;
                    if (t.type === 'text') {
                        link = t.text.link?.url || null;
                    } else {
                        link = t.href || null;
                    }

                    return {
                        text: t.plain_text,
                        annotations: t.annotations,
                        link,
                    };
                });
            }

            if (blockType === 'code') {
                result.language = blockData.language;
            }

            // Handle media blocks (image, file, video, pdf)
            if (['image', 'file', 'video', 'pdf'].includes(blockType)) {
                const media = blockData;
                const source = media[media.type];
                result.url = source?.url || null;
                result.caption = media.caption?.map((t: any) => t.plain_text).join('') || '';
            }

            return result;
        });

        // Extract summary from first paragraph (heading or paragraph block)
        const firstParagraph = structuredContent.find(
            (b) => b.type === 'paragraph' && b.rich_text?.length
        );
        const summary = firstParagraph?.rich_text?.map(rt => rt.text).join(' ') || '';

        // Calculate word count and estimate read time
        const wordCount = structuredContent.reduce((count, block) => {
            if (block.rich_text) {
                const text = block.rich_text.map(rt => rt.text).join(' ');
                return count + text.split(/\s+/).filter(Boolean).length;
            }
            return count;
        }, 0);
        const readTime = `${Math.max(1, Math.round(wordCount / 70))} min read`;

        // Construct the blog post response object
        const blogPost: BlogPost = {
            childPageId: id,
            title,
            cover,
            icon,
            createdTime,
            lastEditedTime,
            summary,
            readTime,
            author: 'Anonymous', // You can modify this logic to fetch the author if necessary
            content: structuredContent,
        };

        // Respond with the structured blog post data
        res.status(200).json(blogPost);
    } catch (error) {
        console.error('Error fetching blog post:', error);
        res.status(500).json({ error: 'Failed to load blog post' });
    }
}
