import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { query as q } from 'faunadb';

import { stripe } from '../../services/stripe';
import { fauna } from '../../services/fauna';

type FaunaUser = {
  ref: { id: string };
  data: { stripe_customer_id: string };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { user } = await getSession({ req });

    const faunaUser = await fauna.query<FaunaUser>(
      q.Get(
        q.Match(
          q.Index('user_by_email'),
          q.Casefold(user.email)
        )
      )
    );

    let customerId = faunaUser.data.stripe_customer_id;

    if (!customerId) {
      const stripeCustomer = await stripe.customers.create({
        email: user.email,
        // metadata
      });

      await fauna.query(
        q.Update(
          q.Ref(q.Collection('users'), faunaUser.ref.id),
          {
            data: {
              stripe_customer_id: stripeCustomer.id,
            }
          }
        )
      );

      customerId = stripeCustomer.id;
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      billing_address_collection: 'required',
      payment_method_types: ['card'],
      line_items: [{
        price: 'price_1LntI5Ar6TvLPkz3ekuSPk4t',
        quantity: 1,
      }],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    });

    return res.status(201).json({ sessionId: stripeCheckoutSession.id });
  } else {
    res.setHeader('Allow', 'POST');
    return res.status(405).end('Method not allowed');
  }
}
