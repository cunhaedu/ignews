import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className='max-w-[1120px] my-0 mx-auto py-0 px-8 h-[calc(100vh-5rem)] flex items-center justify-between'>
        <section className='max-w-[600px]'>
          <span className='text-2xl font-bold'>👏 Hey, welcome</span>
          <h1 className='text-7xl leading-[4.5rem] font-black mt-10'>
            News about the <span className='text-primary-blue'>React</span> world.
          </h1>
          <p className='text-2xl leading-10 mt-6'>
            Get access to all the publications <br />
            <span className='text-primary-blue font-bold'>
              for $9.90 month
            </span>
          </p>

          <div className='mt-9'>
            <SubscribeButton />
          </div>
        </section>

        <img src="/images/avatar.svg" alt="Girl coding" />
      </main>
    </>
  )
}
