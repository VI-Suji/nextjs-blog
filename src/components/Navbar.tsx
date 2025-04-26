import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faPen, faSearch, faUser} from '@fortawesome/free-solid-svg-icons'

export default function Navbar() {
    return(
        <>
            <div className="flex justify-between fixed top-10 border-none rounded-3xl py-4 w-1/2 bg-(--foreground) text-black z-100 shadow-2xl">
                <FontAwesomeIcon icon={faHome} className='text-4xl w-1/4'/>
                <FontAwesomeIcon icon={faUser} className='text-4xl w-1/4'/>
                <FontAwesomeIcon icon={faPen} className='text-4xl w-1/4'/>
                <FontAwesomeIcon icon={faSearch} className='text-4xl w-1/4'/>
            </div>
        </>
    )
}