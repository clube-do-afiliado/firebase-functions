import stripe from 'stripe';

import { definePlugin, Request } from '@/core';
import { PaymentEvent } from '@/handlers/webhookPayment/paymentEvent';


export default definePlugin(() => {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;


    async function processEvent(request: Request): Promise<PaymentEvent> {
        const signature: string = request.header('stripe-signature') ??
            (() => {
                throw new Error('Missing stripe-signature header');
            })();

        const body = request.rawBody;

        const event = stripe.webhooks.constructEvent(body, signature, secret);
        switch (event.type) {
            case 'checkout.session.completed':
                if (event.data.object.payment_status == 'paid') {
                    return {
                        Customer: {
                            Email: event.data.object.customer_details?.email,
                            Name: event.data.object.customer_details?.name,
                        },
                        Plan: { id: event.data.object.metadata?.plan_id },
                        Status: 'paid',
                    };
                }
        }
        return { Customer: undefined, Plan: undefined, Status: 'not_mapped' };
    }

    return { processEvent };
});
