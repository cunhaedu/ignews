import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_PRIVATE_API_KEY, {
  apiVersion: '2022-08-01',
  appInfo: {
    name: 'ig.news',
    version: '1.0.0',
  }
});
