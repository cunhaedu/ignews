import { PrismicProvider } from '@prismicio/react';
import { SessionProvider } from 'next-auth/react';
import { PrismicPreview } from '@prismicio/next';
import Link from 'next/link';

import { prismicRepositoryName } from '../services/prismic';
import { Header } from '../components/Header';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <PrismicProvider
        internalLinkComponent={({ href, ...props }) => (
          <Link href={href}>
            <a {...props} />
          </Link>
        )}
      >
        <PrismicPreview repositoryName={prismicRepositoryName}>
          <Header />
          <Component {...pageProps} />
        </PrismicPreview>
      </PrismicProvider>
    </SessionProvider>
  )
}

export default MyApp
