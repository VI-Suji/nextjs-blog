import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';

interface AboutProps {
  isOpen: boolean;
  toggleOpen: () => void;
  iconSrc: string;
  title: string;
  renderContent: () => React.ReactNode;
}

const About: React.FC<AboutProps> = ({
  isOpen,
  toggleOpen,
  iconSrc,
  title,
  renderContent
}) => {
  return (
    <div className="w-full mx-auto mb-6">
      <div
        onClick={toggleOpen}
        className="flex justify-between items-center border-2 rounded-xl h-[75px] bg-[var(--foreground)] cursor-pointer hover:brightness-95 transition-all duration-300"
      >
        <div className="flex flex-row w-5/6 items-center text-3xl mx-6">
          <Image src={iconSrc} alt="icon" width={50} height={50} />
          <h1 className="text-2xl sm:text-4xl mx-4 text-[var(--background)]">{title}</h1>
        </div>
        <div className="flex flex-row w-1/6 items-center justify-center mx-auto">
          <FontAwesomeIcon
            icon={isOpen ? faAngleUp : faAngleDown}
            className="text-4xl text-[var(--background)] transition-transform duration-500"
          />
        </div>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[1000px] mt-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className={`transition-all duration-500 ease-in-out transform ${
            isOpen
              ? 'opacity-100 translate-y-0 scale-y-100'
              : 'opacity-0 -translate-y-2 scale-y-95'
          }`}
        >
          <div className="px-4">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default About;
