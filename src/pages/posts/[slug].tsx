import { asHTML, asText } from '@prismicio/helpers';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import { getPrismicClient } from '../../services/prismic';

import styles from './post.module.scss';

type Post = {
  slug: string;
  title: string;
  content: string;
  updatedAt: string;
}

type PostProps = {
  post: Post;
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{`${post.title} | Ignews`}</title>
      </Head>

      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>

          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });
  const { slug } = ctx.params;

  if (!session || !session.activeSubscription) {
    return {
      redirect: {
        destination: '/posts',
        permanent: false
      }
    }
  }

  const prismic = getPrismicClient(ctx as unknown);

  const response = await prismic.getByUID('post', String(slug));

  const post = {
    slug,
    title: asText(response.data.title),
    content: asHTML(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  }

  return {
    props: {
      post,
    }
  }
}
