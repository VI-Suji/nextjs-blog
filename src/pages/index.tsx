'use client';

import { useEffect, useState } from 'react';
import Landing from "@/components/Landing";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import PostSkeleton from '@/components/PostSkeleton';

type BlogPost = {
  childPageId: string;
  title: string;
  summary: string;
  createdTime: string;
  readTime: string;
};

export default function Home() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/notion')
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setPosts(data.childPages.slice(0, 2)); // Only show the first 2 posts
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load blog posts.");
        setLoading(false);
      });
  }, []);

  const trimSummary = (text: string) => {
    const words = text.split(/\s+/);
    return words.length <= 20 ? text : words.slice(0, 20).join(' ') + ' ...';
  };

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-4 lg:p-20 lg:gap-12">
      <Navbar />
      <div className="gap-10"></div>
      <div className="w-full lg:w-3/4 pt-24 lg:pt-0">
        <Landing />
      </div>
      <div className="w-full lg:w-3/4 pt-2 lg:pt-0">
        <h1 className="text-6xl pb-4">Latest Posts</h1>

        {loading
          ? [1, 2].map((i) => <PostSkeleton key={i} />)
          : posts.map((post) => (
            <Link key={post.childPageId} href={`/posts/${post.childPageId}`} passHref>
              <Post
                key={post.childPageId}
                title={post.title}
                summary={trimSummary(post.summary)}
                date={new Date(post.createdTime)}
                readTime={post.readTime}
              />
            </Link>
          ))
        }

      </div>
      <div className="flex flex-row w-3/4 lg:w-1/6 p-2 items-center border-2 rounded-2xl text-3xl hover:bg-(--hover-color) hover:border-(--hover-color) transition-transform duration-200 transform hover:scale-110">
        <Link href='/posts'>
          <h1 className="mx-auto">View All Posts</h1>
        </Link>
        <FontAwesomeIcon icon={faArrowRight} className="text-4xl mx-auto" />
      </div>
      <div className="gap-0"></div>
    </div>
  );
}
