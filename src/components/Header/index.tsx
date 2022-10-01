import Image from 'next/future/image';
import Link from 'next/link';
import { SignInButton } from '../SignInButton';

export function Header() {
  return (
    <header className='h-20 border-b border-[#29292E]'>
      <div className='max-w-[1120px] h-20 mx-auto my-0 py-0 px-8 flex items-center'>
        <Image src="/images/logo.svg" width={80} height={80} alt="ig.news" />

        <nav className='ml-8 md:ml-10 lg:ml-20 h-20 '>
          <Link href="/">
            <a className="inline-block relative py-0 px-2 h-20 leading-[5rem] duration-150 text-gray-300 hover:text-white after:content-[''] after:h-[3px] after:rounded-header after:w-full after:absolute after:bottom-[2px] after:left-0 after:bg-primary-yellow">
              Home
            </a>
          </Link>
          <Link href="/posts">
            <a className="inline-block relative ml-8 py-0 px-2 h-20 leading-[5rem] duration-150 text-gray-300 hover:text-white ">
              Posts
            </a>
          </Link>
        </nav>

        <div className='ml-auto hidden md:block'>
          <SignInButton />
        </div>
      </div>
    </header>
  );
}
