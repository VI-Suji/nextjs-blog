import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from 'next/image'

const socialIconClasses =
    'text-6xl lg:text-7xl w-1/4 p-1 my-2 mx-1 lg:mx-2 border-2 rounded-2xl hover:bg-[var(--hover-color)] hover:border-[var(--hover-color)] hover:text-[var(--foreground)] transition-transform duration-200 transform hover:scale-110 hover:rotate-[-10deg]'

export default function Landing() {
    return (
        <div className="flex flex-col lg:flex-row items-center justify-center lg:w-full lg:mx-0 my-4 lg:my-0">

            <div
                className="flex items-center justify-center w-full lg:w-1/4 border-2 border-(--foreground) rounded-4xl h-[300px] mx-2 mb-4 lg:mb-0"
                style={{ color: 'black' }}
            >
                <div className="border-2 border-(--foreground) rounded-full w-3/4 p-2 h-7/8 lg:h-3/4 transition-transform duration-200 transform hover:scale-110">
                    <Image
                        src="/pngs/sujith.png"
                        alt="Sujith"
                        width={100}
                        height={100}
                        className="rounded-full object-cover w-full h-full"
                    />
                </div>
            </div>

            <div
                className="flex flex-col w-full lg:w-3/4 border-2 rounded-4xl h-auto lg:h-[300px] mx-4 px-4 lg:px-20 py-4 lg:py-0"
                style={{
                    backgroundColor: 'var(--foreground)',
                    color: 'black',
                }}
            >
                <div className="text-center lg:px-20 lg:py-6">
                    <h1 className="text-2xl lg:text-5xl text-black py-4 lg:py-1">
                        A <span className="hover:opacity-0">dent</span> in the{' '}
                        <span className="relative group inline-block">
                            <span className="group-hover:opacity-0 transition-opacity duration-200">internet</span>
                            <FontAwesomeIcon
                                icon={faGlobe}
                                className="opacity-0 group-hover:opacity-100 text-blue-500 transition-opacity duration-200 transform scale-110 absolute inset-0"
                            />
                        </span>{' '}
                        that's the{' '}
                        <span
                            className="hover:underline"
                            style={{ textDecorationColor: 'var(--hover-color)' }}
                        >
                            goal
                        </span>.
                    </h1>
                </div>

                <div className="flex flex-wrap lg:flex-nowrap items-center justify-center px-2 lg:px-30">
                    <FontAwesomeIcon icon={faGithub} className={socialIconClasses} />
                    <FontAwesomeIcon icon={faEnvelope} className={socialIconClasses} />
                    <FontAwesomeIcon icon={faTwitter} className={socialIconClasses} />
                    <FontAwesomeIcon icon={faLinkedin} className={socialIconClasses} />
                </div>
            </div>
        </div>
    )
}
