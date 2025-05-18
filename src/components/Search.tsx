import Image from "next/image";

export default function Search() {
    return (
        <div className="flex justify-center items-center w-full px-4 h-full my-auto">
            <div className="flex items-center w-full max-w-xl border-2 border-white focus-within:border-[var(--hover-color)] hover:border-[var(--hover-color)] rounded-full px-3 py-2 shadow hover:shadow-md transition-all duration-200">
                <Image
                    src="/pngs/magnifier.png"
                    alt="Search icon"
                    width={24}
                    height={24}
                    className="mx-2 sm:w-[30px] sm:h-[30px] md:w-[40px] md:h-[40px]"
                />
                <input
                    type="text"
                    placeholder="Not yet implemented"
                    className="flex-grow outline-none bg-transparent text-lg sm:text-2xl md:text-3xl text-white mx-2"
                />
            </div>
        </div>
    );
}
