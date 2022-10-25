import { signIn, useSession } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';

type SubscribeButtonProps = {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { status } = useSession();

  async function handleSubscribe() {
    if(status !== 'authenticated') {
      signIn();
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
