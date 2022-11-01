import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

type SubscribeButtonProps = {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const session = useSession();
  const router = useRouter();

  async function handleSubscribe() {
    console.log('oi');
    console.log(session.data);

    if(session.status !== 'authenticated') {
      signIn('github');
      return;
    }

    if (session.data && session.data.activeSubscription) {
      router.push('/posts')
      return;
    }

    try {
      const response = await api.post('/subscribe');
      const { sessionId } = response.data;
      const stripe = await getStripeJs();
      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <button
      className='h-16 w-64 rounded-[2rem] bg-primary-yellow text-black text-xl font-bold flex items-center justify-center transition duration-200 hover:brightness-90'
      type='button'
      onClick={handleSubscribe}
    >
      Subscribe now
    </button>
  );
}
