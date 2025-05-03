import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'

const socialIconClasses =
    'text-6xl lg:text-7xl w-1/4 p-1 my-2 mx-1 lg:mx-2 border-2 rounded-2xl hover:bg-[var(--hover-color)] hover:border-[var(--hover-color)] hover:text-[var(--foreground)] transition-transform duration-200 transform hover:scale-110'


export default function Contacts() {
    return (
        <>
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center px-2 lg:px-30">
                <FontAwesomeIcon icon={faGithub} className={socialIconClasses} />
                <FontAwesomeIcon icon={faEnvelope} className={socialIconClasses} />
                <FontAwesomeIcon icon={faTwitter} className={socialIconClasses} />
                <FontAwesomeIcon icon={faLinkedin} className={socialIconClasses} />
            </div>
        </>
    )
}