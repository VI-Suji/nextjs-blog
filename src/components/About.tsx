import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function About() {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <>
            <div onClick={() => setIsOpen(!isOpen)} className="flex w-3/4 justify-between mx-auto border-2 rounded-xl h-[100]">
                <div className="flex-row w-5/6">
                    
                </div>
                <div className="flex flex-row w-1/6 items-center justify-center mx-auto">
                    {!isOpen && <FontAwesomeIcon  icon={faAngleDown} className="text-4xl" />}
                    {isOpen && <FontAwesomeIcon icon={faAngleUp} className="text-4xl" />}
                </div>
            </div>
        </>
    )
}
