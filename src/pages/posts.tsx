import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import Image from "next/image";
import PostSkeleton from "@/components/PostSkeleton";
import Link from "next/link";

const trimSummary = (summary: string, length: number = 150) => {
  if (summary.length <= length) return summary;
  return summary.substring(0, length) + "...";
};

// Icon → Category mapping
const categoryMap: Record<string, string> = {
  "/pngs/image.png": "Photo",
  "/pngs/code.png": "Code",
  "/pngs/think.png": "Thought",
  "/pngs/book.png": "Book",
};

export default function Posts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    const categoryQuery = selectedCategory ? `&category=${selectedCategory}` : "";
    fetch(`/api/notion?page=${currentPage}${categoryQuery}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setPosts(data.childPages);
          setTotalPages(data.totalPages);
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load blog posts.");
        setLoading(false);
      });
  }, [currentPage, selectedCategory]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCategoryClick = (category: string) => {
    setCurrentPage(1); // Reset to first page on category change
    setSelectedCategory((prev) => (prev === category ? null : category)); // Toggle
  };

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-4 lg:p-20 lg:gap-12">
      <Navbar />
      <div className="mt-24 sm:mt-1" />
      <div className="flex flex-col w-full h-full justify-center">
        <div className="m-auto w-full lg:w-3/4 pt-2 lg:pt-0">
          <h1 className="text-4xl sm:text-6xl py-4 text-center sm:text-left">
            {selectedCategory ? selectedCategory : "All Post"}s
          </h1>


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
            ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:w-3/4 m-auto mt-10 gap-4">
          <div className="flex flex-row w-5/6 sm:w-1/3 h-[50px] sm:h-[60px] border-2 rounded-xl bg-[var(--foreground)]">
            {Object.keys(categoryMap).map((src, i) => {
              const category = categoryMap[src];
              const isSelected = selectedCategory === category;

              return (
                <div
                  key={i}
                  onClick={() => handleCategoryClick(category)}
                  className={`flex w-1/4 h-full rounded-lg border-4 justify-center items-center cursor-pointer transition duration-200 ${isSelected ? "border-4 p-4 border-[var(--hover-color)]" : "" }
                    `}
                >
                  <Image
                    src={src}
                    width={30}
                    height={30}
                    alt={`Icon ${i}`}
                    className="sm:w-[50px] sm:h-[50px]"
                  />
                </div>
              );
            })}
          </div>
          { totalPages > 0 && 
          <div className="flex flex-row w-5/6 sm:w-1/4 h-[50px] sm:h-[60px] border-2 rounded-xl bg-[var(--foreground)]">
            <div
              className="flex w-1/3 h-full rounded-lg border-2 justify-center items-center cursor-pointer"
              onClick={handlePrevPage}
            >
              <Image
                src="/pngs/left.png"
                width={30}
                height={30}
                alt="Left arrow"
                className="sm:w-[50px] sm:h-[50px]"
              />
            </div>
            <div className="flex w-1/3 h-full rounded-lg border-2 justify-center items-center">
              <h1 className="text-xl sm:text-4xl text-black">
                {currentPage} / {totalPages}
              </h1>
            </div>
            <div
              className="flex w-1/3 h-full rounded-lg border-2 justify-center items-center cursor-pointer"
              onClick={handleNextPage}
            >
              <Image
                src="/pngs/right-arrow.png"
                width={30}
                height={30}
                alt="Right arrow"
                className="sm:w-[50px] sm:h-[50px]"
              />
            </div>
          </div>
          }
        </div>
      </div>
    </div>
  );
}
