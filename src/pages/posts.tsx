import Navbar from "@/components/Navbar";
import Post from "@/components/Post";
import Image from "next/image";

export default function Posts() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-4 lg:p-20 lg:gap-12">
      <Navbar />
      <div className="mt-24 sm:mt-1" />
            <div className="flex flex-col w-full h-full justify-center">
                <div className="m-auto w-full lg:w-3/4 pt-2 lg:pt-0">
                    <h1 className="text-4xl sm:text-6xl py-4 text-center sm:text-left">Latest Posts</h1>
                    <Post />
                    <Post />
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center w-full sm:w-3/4 m-auto mt-10 gap-4">
                    
                    <div className="flex flex-row w-5/6 sm:w-1/3 h-[50px] sm:h-[60px] border-2 rounded-xl bg-[var(--foreground)]">
                        {[ "/pngs/image.png", "/pngs/code.png", "/pngs/think.png" ].map((src, i) => (
                            <div key={i} className="flex w-1/3 h-full rounded-lg border-2 justify-center items-center">
                                <Image
                                    src={src}
                                    width={30}
                                    height={30}
                                    alt={`Icon ${i}`}
                                    className="sm:w-[50px] sm:h-[50px]"
                                />
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-row w-5/6 sm:w-1/4 h-[50px] sm:h-[60px] border-2 rounded-xl bg-[var(--foreground)]">
                        <div className="flex w-1/3 h-full rounded-lg border-2 justify-center items-center">
                            <Image
                                src="/pngs/left.png"
                                width={30}
                                height={30}
                                alt="Left arrow"
                                className="sm:w-[50px] sm:h-[50px]"
                            />
                        </div>
                        <div className="flex w-1/3 h-full rounded-lg border-2 justify-center items-center">
                            <h1 className="text-xl sm:text-4xl text-black">1/5</h1>
                        </div>
                        <div className="flex w-1/3 h-full rounded-lg border-2 justify-center items-center">
                            <Image
                                src="/pngs/right-arrow.png"
                                width={30}
                                height={30}
                                alt="Right arrow"
                                className="sm:w-[50px] sm:h-[50px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
    </div>
  );
}
