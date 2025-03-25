import { definePlugin, Request } from '@/core';
import stripe from 'stripe';


export default definePlugin(() => {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;


    async function processEvent(request: Request) {
        const signature: string = request.header('stripe-signature') ??
            (() => {
                throw new Error('Missing stripe-signature header');
            })();

        const body = request.rawBody;


        const event = stripe.webhooks.constructEvent(body, signature, secret);

        switch (event.type) {
            case 'checkout.session.completed':
                if (event.data.object.payment_status == 'paid') {
                    console.log('pagamento concluido');
                }
        }
    }

    return { processEvent };
});
