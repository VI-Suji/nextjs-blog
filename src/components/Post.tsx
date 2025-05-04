import Image from 'next/image';

type PostProps = {
  title: string;
  summary: string;
  date: Date;
  readTime: string;
  iconSrc?: string;
  arrowSrc?: string;
};

export default function Post({
  title,
  summary,
  date,
  readTime,
  iconSrc = '/pngs/pen.png',
  arrowSrc = '/pngs/right.png',
}: PostProps) {
  const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
  const year = date.getFullYear();
  const day = String(date.getDate()).padStart(2, '0');

  return (
    <div className="flex flex-col lg:flex-row w-full border-4 rounded-2xl h-auto lg:h-[200px] mb-2 text-black group hover:border-4 transition-all bg-(--foreground) hover:border-4 hover:border-(--hover-color)">
      <div className="flex flex-row lg:flex-col w-full lg:w-1/6 lg:m-4 p-2 lg:p-0 gap-2">
        <div className="flex w-full lg:h-1/4 gap-1 lg:gap-2">
          <div className="w-1/2 lg:text-lg text-lg text-center p-2 border-2 rounded-xl flex items-center justify-center transition-transform duration-200 transform hover:scale-110">
            {month}
          </div>
          <div className="w-1/2 lg:text-lg text-lg text-center p-2 border-2 rounded-xl flex items-center justify-center transition-transform duration-200 transform hover:scale-110">
            {year}
          </div>
        </div>
        <div className="w-full lg:h-3/4 text-center text-3xl lg:text-4xl p-2 border-2 rounded-xl flex items-center justify-center transition-transform duration-200 transform hover:scale-110">
          {day}
        </div>
      </div>

      <div className="flex flex-col w-full lg:w-1/2 h-auto lg:h-full px-2 lg:px-0">
        <div className="flex items-center gap-2 mx-2 lg:mx-6 mt-2 lg:mt-1 lg:p-4">
          <div className="flex-shrink-0">
            <Image src={iconSrc} alt="Post Icon" width={60} height={60} />
          </div>
          <div className="relative inline-block text-2xl lg:text-4xl">
            <span className="transition-colors duration-300">{title}</span>
            <span className="absolute left-0 -bottom-[1px] h-[3px] w-0 bg-blue-500 transition-all duration-1000 group-hover:w-full"></span>
          </div>
        </div>
        <div className="text-sm lg:text-2xl px-2 lg:px-4 mx-2 lg:mx-6 mt-2 lg:mt-0">
          {summary}
        </div>
      </div>

      <div className="w-full lg:w-1/4 lg:m-4 p-2 lg:p-0">
        <div className="flex flex-row lg:flex-col h-full items-center justify-between lg:justify-center mx-4 lg:mx-10 gap-2">
          <div
            className="text-xs lg:text-base w-full text-center py-2 my-2 bg-opacity-20 rounded-xl transition-transform duration-200 transform hover:scale-110"
            style={{ backgroundColor: 'var(--hover-color)' }}
          >
            {readTime.toUpperCase()}
          </div>
          <div className="hidden lg:flex items-center justify-center w-full h-3/4">
            <Image src={arrowSrc} width={130} height={130} alt="Arrow" />
          </div>
        </div>
      </div>
    </div>
  );
}
