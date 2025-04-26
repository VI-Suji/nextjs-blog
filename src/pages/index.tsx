
import Landing from "@/components/Landing";
import Navbar from "@/components/Navbar";
import Post from "@/components/Post";

export default function Home() {
  return (
    <div
      className={`flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20`}
    >
      <Navbar />
      <div className="gap-0"></div>
      <Landing />
      <section className="w-3/4">
        <h1 className="text-6xl pb-4">Latest Posts</h1>
        <Post />
        <Post />
        <Post />
      </section>
    </div>
  );
}
