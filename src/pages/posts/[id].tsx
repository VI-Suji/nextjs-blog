'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from "@/components/Navbar";
import PostSkeleton from '@/components/PostSkeleton';
import Image from 'next/image';

type RichText = {
  text: string;
  annotations: {
    bold: boolean;
    italic: boolean;
    underline: boolean;
    code: boolean;
    strikethrough: boolean;
    color: string;
  };
  link: string | null;
};

type Block = {
  type: string;
  rich_text?: RichText[];
  language?: string;
  url?: string;
  caption?: string;
};

type BlogPost = {
  childPageId: string;
  title: string;
  content: Block[];
  createdTime: string;
  readTime: string;
  cover: string | null;
  author: string;
};

export default function BlogContent() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetch(`/api/notion/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setPost(data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching post content:", error);
          setError("Failed to load blog content.");
          setLoading(false);
        });
    }
  }, [id]);

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };

  const renderText = (richText: RichText[]) => {
    return richText.map((item, index) => {
      const { annotations, text, link } = item;
      let content = text;

      if (link) {
        return (
          <a key={index} href={link} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
            {text}
          </a>
        );
      }

      return (
        <span
          key={index}
          className={`
            items-center justify-center
            ${annotations.bold ? 'font-semibold text-(--hover-color)' : ''}
            ${annotations.italic ? 'italic text-(--hover-color)' : ''}
            ${annotations.underline ? 'underline text-(--hover-color)' : ''}
            ${annotations.strikethrough ? 'line-through text-(--hover-color)' : ''}
            ${annotations.code ? 'bg-gray-100 px-1 rounded text-sm font-mono' : ''}
            text-${annotations.color !== 'default' ? annotations.color : '(--foreground)'}
          `}
        >
          {content}
        </span>
      );
    });
  };

  const renderBlock = (block: Block, index: number) => {
    switch (block.type) {
      case 'paragraph':
        return <p key={index} className="text-lg leading-relaxed text-white">{block.rich_text && renderText(block.rich_text)}</p>;

      case 'heading_1':
        return <h1 key={index} className="text-4xl font-semibold my-4 text-(--foreground)">{renderText(block.rich_text || [])}</h1>;

      case 'heading_2':
        return <h2 key={index} className="text-3xl my-3 text-white">{renderText(block.rich_text || [])}</h2>;

      case 'heading_3':
        return <h3 key={index} className="text-2xl font-medium my-2 text-white">{renderText(block.rich_text || [])}</h3>;

      case 'code':
        return (
          <pre key={index} className="bg-(--background) p-4 border-(--hover-color) border-2 rounded-2xl overflow-auto text-sm font-mono text-(--foreground)">
            <div className="text-gray-400 text-xs my-2">{block.language}</div>
            <code>{block.rich_text?.map(rt => rt.text).join('')}</code>
          </pre>
        );

      case 'image':
        return (
          <div key={index} className="my-6 text-center text-white">
            <Image
              src={block.url || ''}
              alt={block.caption || 'Blog image'}
              width={800}
              height={400}
              className="rounded-2xl mx-auto border-(--hover-color) border-2"
            />
            {block.caption && <p className="text-gray-500 text-sm mt-2 text-white">{block.caption}</p>}
          </div>
        );

      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-gray-300 pl-4 italic text-gray-600 text-white">
            {renderText(block.rich_text || [])}
          </blockquote>
        );

      case 'bulleted_list_item':
        return (
          <ul key={index} className="list-disc list-inside text-white mx-5 my-0 sm:mx-20">
            <li>{renderText(block.rich_text || [])}</li>
          </ul>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-4 lg:p-20 lg:gap-12">
      <Navbar />
      <div className="w-full lg:w-3/4 pt-12">
        {loading ? (
          <div className="mt-20 sm:mt-5">
            <PostSkeleton />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="flex justify-center w-full">
            <div className="gap-10"></div>
            <div className="w-full sm:w-3/4 space-y-10 mt-20 mx-5 sm:mx-2 sm:mt-10">
              <div className="flex flex-col items-center justify-center">
                {post?.cover && (
                  <div className="w-full mb-6">
                    <Image
                      src={post.cover}
                      alt={post.title}
                      width={1200}
                      height={400}
                      objectFit="cover"
                      className="rounded-2xl"
                    />
                  </div>
                )}
                <h1 className="text-5xl font-semibold text-center">{post?.title}</h1>
                {post && (
                  <p className="text-lg text-gray-500 mt-2">
                    {`${formatDate(post.createdTime)} • ${post.readTime}`}
                  </p>
                )}
              </div>

              <div className="text-xl justify-center leading-relaxed space-y-6">
                {post?.content.map((block, index) => renderBlock(block, index))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
