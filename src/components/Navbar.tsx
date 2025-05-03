import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const NavBar: React.FC = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  const navItems = [
    { href: '/', icon: <Image src="/pngs/home.png" alt="Home" width={40} height={40} />, label: 'Home' },
    { href: '/about', icon: <FontAwesomeIcon icon={faUser} className="text-4xl" />, label: 'About' },
    { href: '/posts', icon: <Image src="/pngs/pen.png" alt="Posts" width={40} height={40} />, label: 'Posts' },
    { href: '/search', icon: <Image src="/pngs/magnifier.png" alt="Search" width={40} height={40} />, label: 'Search' },
  ];

  return (
    <div className="flex justify-center fixed top-10 border-none rounded-3xl py-3 w-11/12 lg:w-1/2 bg-[var(--foreground)] text-black z-50 shadow-2xl">
      {navItems.map(({ href, icon, label }) => (
        <Link href={href} key={label} className="w-1/4">
          <div
            className={`flex items-center justify-center transition-transform duration-200 transform hover:scale-105 ${
              currentPath === href ? 'border-b-4 rounded-full p-1' : ''
            }`}
          >
            {icon}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavBar;
