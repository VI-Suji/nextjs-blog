import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPen, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'

export default function Navbar() {
    return (
        <>
            <div className="flex justify-center fixed top-10 border-none rounded-3xl py-4 w-9/10 lg:w-1/2 bg-(--foreground) text-black z-100 shadow-2xl">
                <div className="flex-row text-center w-1/4">
                    <FontAwesomeIcon icon={faHome} className='text-4xl' />
                </div>
                <div className="flex-row text-center w-1/4">
                    <FontAwesomeIcon icon={faUser} className='text-4xl' />
                </div>
                <div className="flex items-center justify-center w-1/4">
                    <Image src="/pngs/pen.png" alt="" width={40} height={40} className='mx-2' />
                </div>
                <div className="flex items-center justify-center w-1/4">
                    <Image src="/pngs/magnifier.png" alt="" width={40} height={40} className='mx-2' />
                </div>
            </div>
        </>
    )
}