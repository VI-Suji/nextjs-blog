import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPen, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { useState } from 'react'

interface NavBarProps {
    selectedNav: string;
    setSelectedNav: (nav: string) => void;
}

const NavBar: React.FC<NavBarProps> = ({ selectedNav, setSelectedNav }) => {
    return (
        <>
            <div className="flex justify-center fixed top-10 border-none rounded-3xl py-3 w-9/10 lg:w-1/2 bg-(--foreground) text-black z-100 shadow-2xl">
                <div onClick={() => setSelectedNav('Home')} className={`flex items-center justify-center w-1/4 transition-transform duration-200 transform hover:scale-105 ${selectedNav === 'Home' ? 'border-b-4 rounded-full p-1' : ''}`}>
                    <Image src="/pngs/home.png" alt="" width={40} height={40} className='mx-2' />
                </div>
                <div onClick={() => setSelectedNav('About')} className={`flex items-center justify-center w-1/4 transition-transform duration-200 transform hover:scale-105 ${selectedNav === 'About' ? 'border-b-4 rounded-full p-1' : ''}`}>
                    <FontAwesomeIcon icon={faUser} className='text-4xl' />
                </div>
                <div onClick={() => setSelectedNav('Posts')} className={`flex items-center justify-center w-1/4 transition-transform duration-200 transform hover:scale-105 ${selectedNav === 'Posts' ? 'border-b-4 rounded-full p-1' : ''}`}>
                    <Image src="/pngs/pen.png" alt="" width={40} height={40} className='mx-2' />
                </div>
                <div onClick={() => setSelectedNav('Search')} className={`flex items-center justify-center w-1/4 transition-transform duration-200 transform hover:scale-105 ${selectedNav === 'Search' ? 'border-b-4 rounded-full p-1' : ''}`}>
                    <Image src="/pngs/magnifier.png" alt="" width={40} height={40} className='mx-2' />
                </div>
            </div>
        </>
    )
}

export default NavBar;