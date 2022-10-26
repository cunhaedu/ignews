## IG News

A portal with the news about the react built in the ignite

## Getting start

In order to run this application you must have an account in the [stripe](https://stripe.com) and [faunadb](https://fauna.com/), then you can set them up with the following configuration:

### Faunadb

First, create a database with following collections:
* users
* subscriptions

Then, create the following indexes:
* user_by_email
  - Source Collection: Users
  - Terms: data.email
* user_by_stripe_customer_id
  - Source Collection: Users
  - Terms: data.stripe_customer_id
* subscription_by_id
  - Source Collection: Subscriptions
  - Terms: data.id

### Stripe

Create an account for the ignews project and then create a product called **Subscription**.
You can set the price you want, the Billing period should be Monthly though.

#### Listening to stripe webhooks

In this application we wanna get some user actions from strip, the good news is that we can with the webhooks provided by the stripe. To listen them you should have the [stripe cli](https://github.com/stripe/stripe-cli) installed in your machine in order to run the following command:

```
stripe listen --forward-to localhost:3000/api/webhooks
```

where the localhost:3000 is the host of your application, if you change the port please reflect it in the command above
