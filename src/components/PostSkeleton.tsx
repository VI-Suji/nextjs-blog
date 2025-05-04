import Image from 'next/image';

type PostSkeletonProps = {
  iconSrc?: string;
  arrowSrc?: string;
};

export default function PostSkeleton({
  iconSrc = '/pngs/pen.png',
  arrowSrc = '/pngs/right.png',
}: PostSkeletonProps) {
  return (
    <div className="flex flex-col lg:flex-row w-full border-4 rounded-2xl h-auto lg:h-[200px] mb-2 text-black animate-pulse bg-gray-200">
      <div className="flex flex-row lg:flex-col w-full lg:w-1/6 lg:m-4 p-2 lg:p-0 gap-2">
        <div className="flex w-full lg:h-1/4 gap-2">
          <div className="w-1/2 bg-gray-300 h-12 sm:h-10 rounded-xl"></div>
          <div className="w-1/2 bg-gray-300 h-12 sm:h-10 rounded-xl"></div>
        </div>
        <div className="w-full lg:h-3/4 bg-gray-300 h-12 rounded-xl"></div>
      </div>

      <div className="flex flex-col w-full lg:w-1/2 h-auto lg:h-full px-2 lg:px-0">
        <div className="flex items-center gap-2 mx-2 lg:mx-6 mt-2 lg:mt-1 lg:p-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
          </div>
          <div className="relative inline-block w-1/2 bg-gray-300 h-8 rounded-xl"></div>
        </div>
        <div className="text-sm lg:text-xl px-2 lg:px-4 mx-2 lg:mx-6 mt-2 lg:mt-0">
          <div className="w-full bg-gray-300 h-6 rounded-xl mb-4"></div>
        </div>
      </div>

      <div className="w-full lg:w-1/4 lg:m-4 p-2 lg:p-0">
        <div className="flex flex-row lg:flex-col h-full items-center justify-between lg:justify-center mx-4 lg:mx-10 gap-2">
          <div className="text-xs lg:text-base w-full text-center py-2 my-2 bg-gray-300 h-6 rounded-xl"></div>
          <div className="hidden lg:flex items-center justify-center w-full h-3/4">
            <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
