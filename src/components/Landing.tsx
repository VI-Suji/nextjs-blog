import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faGlobe, faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const socialIconClasses = 'text-7xl w-1/4 p-1 mx-2 border-2 rounded-lg hover:bg-(--hover-color) hover:border-(--hover-color) hover:text-(--foreground) transition-transform duration-200 transform hover:scale-110';

export default function Landing() {
  return (
    <div className="flex flex-row items-center justify-center w-3/4 my-0">

      <div className="flex items-center justify-center w-1/4 border-2 rounded-4xl h-[300px] mx-2 bg-(--foreground) text-black">
        <div className="border-2 rounded-full w-3/4 p-2 h-[200px]"></div>
      </div>

      <div className="flex flex-col w-3/4 border-4 rounded-4xl h-[300px] mx-4 px-20 bg-(--foreground) text-black hover:border-(--hover-color) hover:border-4">
        <div className="align-center justify-center items-center px-20 py-6">
          <h1 className="text-5xl text-black">
            A <span className="hover:opacity-0">dent</span> in the{' '}
            <span className="relative group inline-block">
              <span className="group-hover:opacity-0 transition-opacity duration-200">internet</span>
              <FontAwesomeIcon
                icon={faGlobe}
                className="opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity duration-200 transform scale-110 absolute inset-0"
              />
            </span>{' '}
            that's the <span className="hover:underline hover:decoration-(--hover-color)">goal</span>.
          </h1>
        </div>

        <div className="flex flex-row items-center justify-center px-30">
          <FontAwesomeIcon icon={faGithub} className={socialIconClasses} />
          <FontAwesomeIcon icon={faMailBulk} className={socialIconClasses} />
          <FontAwesomeIcon icon={faTwitter} className={socialIconClasses} />
          <FontAwesomeIcon icon={faLinkedin} className={socialIconClasses} />
        </div>
      </div>
    </div>
  )
}
