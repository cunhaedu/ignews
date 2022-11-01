import Image from 'next/future/image';

import { SignInButton } from '../SignInButton';
import { ActiveLink } from '../ActiveLink';

import styles from './styles.module.scss';

export function Header() {
  return (
    <header className='h-20 border-b border-[#29292E]'>
      <div className={styles.headerContent}>
        <Image src="/images/logo.svg" width={80} height={80} alt="ig.news" />

        <nav className='ml-8 md:ml-10 lg:ml-20 h-20'>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>
              Home
            </a>
          </ActiveLink>
          <ActiveLink activeClassName={styles.active} href="/posts">
            <a>
              Posts
            </a>
          </ActiveLink>
        </nav>

        <div className='ml-auto hidden md:block'>
          <SignInButton />
        </div>
      </div>
    </header>
  );
}
