import Landing from "@/components/Landing";
import Post from "@/components/Post";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons/faArrowRight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomePage() {
    return (
        <>
            <div className="gap-10"></div>
            <div className="w-full lg:w-3/4 pt-24 lg:pt-0">
                <Landing />
            </div>
            <div className="w-full lg:w-3/4 pt-2 lg:pt-0">
                <h1 className="text-6xl pb-4">Latest Posts</h1>
                <Post />
                <Post />
            </div>
            <div className="flex flex-row w-3/4 lg:w-1/6 p-2 items-center border-2 rounded-2xl text-3xl hover:bg-(--hover-color) hover:border-(--hover-color) transition-transform duration-200 transform hover:scale-110">
                <h1 className="mx-auto">View All Posts</h1>
                <FontAwesomeIcon icon={faArrowRight} className="text-4xl mx-auto" />
            </div>
            <div className="gap-0"></div>
        </>
    )
}