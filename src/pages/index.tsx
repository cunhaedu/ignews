import { GetStaticProps } from 'next';
import Image from 'next/future/image';
import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

type HomeProps = {
  product: {
    priceId: string,
    amount: string,
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className='max-w-[1120px] my-0 mx-auto py-0 px-8 min-h-[calc(100vh-5rem)] flex items-center justify-center lg:justify-between'>
        <section className='max-w-[600px] text-center lg:text-left'>
          <span className='text-2xl font-bold block'>👏 Hey, welcome</span>
          <h1 className='text-6xl lg:text-7xl lg:leading-[4.5rem] font-black mt-10'>
            News about the <span className='text-primary-blue'>React</span> world.
          </h1>
          <p className='text-2xl leading-10 mt-6'>
            Get access to all the publications <br />
            <span className='text-primary-blue font-bold'>
              for {product.amount} month
            </span>
          </p>

          <div className='mt-9 flex items-center justify-center lg:block'>
            <SubscribeButton priceId={product.priceId} />
          </div>
        </section>

        <Image
          src="/images/avatar.svg"
          width={350}
          height={350}
          alt='Girl coding'
          className='hidden lg:block'
        />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LntI5Ar6TvLPkz3ekuSPk4t');

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
