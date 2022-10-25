import { stripe } from '../../../services/stripe';
import { fauna } from '../../../services/fauna';
import { query as q } from 'faunadb';

type saveSubscriptionRequest = {
  subscriptionId: string;
  customerId: string;
}

export async function saveSubscription({
  subscriptionId,
  customerId,
}: saveSubscriptionRequest) {
  console.log('cheguei');

  const userRef = await fauna.query(
    q.Select(
      "ref",
      q.Get(
        q.Match(
          q.Index('user_by_stripe_customer_id'),
          customerId,
        ),
      ),
    ),
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    priceId: subscription.items.data[0].price.id,
  }

  console.log(subscriptionData);


  await fauna.query(
    q.Create(
      q.Collection('subscriptions'),
      { data: subscriptionData }
    )
  )
}
