import { Client } from '@notionhq/client';
import {
  BlockObjectResponse,
  PageObjectResponse,
  RichTextItemResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { NextApiRequest, NextApiResponse } from 'next';

const notion = new Client({
  auth: process.env.NOTION_API_KEY || '', // Replace with actual API key
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
  summary: string | undefined;
  readTime: string;
  content: BlogContentBlock[];
};

type ApiResponse = {
  childPages: BlogPost[];
  totalPages: number;
};

function isBlockObjectResponse(block: PartialBlockObjectResponse | BlockObjectResponse): block is BlockObjectResponse {
  return (block as BlockObjectResponse).type !== undefined;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse | { error: string }>
) {
  const parentPageId = '1e82f034f00a804486abd48a0802cd94';

  const page = parseInt(req.query.page as string) || 1;
  const postsPerPage = 3;

  try {
    const response = await notion.blocks.children.list({
      block_id: parentPageId,
    });

    const childPages = response.results.filter(
      (block): block is BlockObjectResponse => isBlockObjectResponse(block) && block.type === 'child_page'
    );

    const totalPosts = childPages.length;
    const totalPages = Math.ceil(totalPosts / postsPerPage);

    const currentPage = Math.min(Math.max(page, 1), totalPages);

    const startIdx = (currentPage - 1) * postsPerPage;
    const endIdx = startIdx + postsPerPage;
    const paginatedChildPages = childPages.slice(startIdx, endIdx);

    const childPageDetails: BlogPost[] = await Promise.all(
      paginatedChildPages.map(async (block) => {
        const childPageId = block.id;

        const pageInfo = await notion.pages.retrieve({
          page_id: childPageId,
        }) as PageObjectResponse;

        const createdTime = pageInfo.created_time;
        const lastEditedTime = pageInfo.last_edited_time;

        let cover: string | null = null;

        if (pageInfo.cover) {
          if (pageInfo.cover.type === 'external') {
            cover = pageInfo.cover.external.url;
          } else if (pageInfo.cover.type === 'file') {
            cover = pageInfo.cover.file.url;
          }
        }

        let icon: string | null = null;

        if (pageInfo.icon) {
          if (pageInfo.icon.type === 'emoji') {
            icon = pageInfo.icon.emoji;
          } else if (pageInfo.icon.type === 'external') {
            icon = pageInfo.icon.external.url;
          } else if (pageInfo.icon.type === 'file') {
            icon = pageInfo.icon.file.url;
          } else {
            icon = null;
          }
        }

        const childPageContent = await notion.blocks.children.list({
          block_id: childPageId,
        });

        const orderedContent: BlogContentBlock[] = childPageContent.results.map((block) => {
          if (!isBlockObjectResponse(block)) {
            return { type: 'unsupported' };
          }
        
          const contentBlock: BlogContentBlock = { type: block.type };
        
          // 🔥 Correctly extract rich_text from block[block.type]
          const blockContent = (block as any)[block.type];
          const richText = blockContent?.rich_text;
        
          if (Array.isArray(richText)) {
            contentBlock.rich_text = richText.map((t: RichTextItemResponse) => ({
              text: t.plain_text,
              annotations: t.annotations,
              link: t.type === 'text' ? t.text.link?.url || null : t.href || null,
            }));
          }
        
          return contentBlock;
        });        
        
        const firstTextBlock = orderedContent.find(
          (block) => {
            return block.type === 'heading_3' &&
              block.rich_text &&
              block.rich_text.length > 0;
          }
        );
        
        const summary = firstTextBlock
          ? firstTextBlock.rich_text?.map(rt => rt.text).join(' ')
          : 'No summary available';

        const wordCount = orderedContent.reduce((count, block) => {
          if (block.rich_text) {
            const text = block.rich_text.map(rt => rt.text).join(' ');
            return count + text.split(/\s+/).filter(Boolean).length;
          }
          return count;
        }, 0);
        const readTime = `${Math.max(1, Math.round(wordCount / 70))} min read`;

        // Ensure that `block.child_page?.title` is only accessed for blocks of type `child_page`
        const title = block.type === 'child_page' ? block.child_page?.title || 'Untitled' : 'Not a child page';

        return {
          childPageId,
          title,
          cover,
          icon,
          createdTime,
          lastEditedTime,
          summary,
          readTime,
          content: orderedContent,
        };
      })
    );

    res.status(200).json({ childPages: childPageDetails, totalPages });
  } catch (error: any) {
    console.error('Error fetching Notion page content:', error.message, error);
    res.status(500).json({ error: 'Failed to fetch Notion page content' });
  }
}
