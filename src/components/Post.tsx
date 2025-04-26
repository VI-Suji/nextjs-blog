import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Post() {
    return (
        <>
            <div className="flex flex-row w-full border-4 rounded-2xl h-[200px] mb-6 bg-(--foreground) text-black hover:border-4 hover:border-(--hover-color)">
                <div className="flex flex-col w-1/4 m-4">
                    <div className="flex w-full h-1/4 gap-2 mb-2">
                        <div className="w-1/2 text-center p-2 border-2 rounded-xl flex items-center justify-center">
                            FEB
                        </div>
                        <div className="w-1/2 text-center p-2 border-2 rounded-xl flex items-center justify-center">
                            2025
                        </div>
                    </div>
                    <div className="w-full h-3/4 text-center text-4xl p-2 border-2 rounded-xl flex items-center justify-center">
                        01
                    </div>
                </div>
                <div className="flex flex-col w-1/2 h-full">
                    <div className="flex mx-6 mt-4 p-4">
                        <div className="flex-row">
                            <FontAwesomeIcon icon={faPen} className="text-4xl" />
                        </div>
                        <div className="flex-row text-4xl px-4">My First Blog</div>
                    </div>
                    <div className="flex-col text-2xl px-4 mx-6">A note on how we're just channeling the efforts of those who came before us so … </div>
                </div>
                <div className="w-1/4 m-4">
                    <div className="flex flex-col h-full items-center justify-center mx-10">
                        <div className="flex-row h-1/4 border-none rounded-xl w-full text-center py-2 mb-2 bg-(--hover-color)">10 MIN READ</div>
                        <div className="flex flex-row h-3/4 border-2 rounded-xl w-full text-center items-center justify-center">IMAGE</div>
                    </div>
                </div>
            </div>
        </>
    )
}