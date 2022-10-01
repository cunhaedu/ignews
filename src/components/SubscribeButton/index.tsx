type SubscribeButtonProps = {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  return (
    <button
      className='h-16 w-64 rounded-[2rem] bg-primary-yellow text-black text-xl font-bold flex items-center justify-center transition duration-200 hover:brightness-90'
      type='button'
    >
      Subscribe now
    </button>
  );
}
