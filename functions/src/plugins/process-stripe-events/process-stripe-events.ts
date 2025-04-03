import stripe from 'stripe';

import { definePlugin, Request } from '@/core';
import { PaymentEvent } from '@/handlers/webhookPayment/paymentEvent';

const EVENT_SAFE_LIST: stripe.Event['type'][] = [
    'checkout.session.completed',
];

function mapData(data: any): PaymentEvent {
    return {
        Customer: {
            Email: data.object.customer_details?.email,
            Name: data.object.customer_details?.name,
        },
        Plan: { id: data.object.metadata?.plan_id },
        Status: 'paid',
    };
}

export default definePlugin(() => {
    const secret = process.env.STRIPE_WEBHOOK_SECRET;

    async function processEvent(request: Request): Promise<PaymentEvent> {
        const signature: string = request.header('stripe-signature') ??
            (() => {
                throw new Error('Missing stripe-signature header');
            })();

        const body = request.rawBody;

        const event = stripe.webhooks.constructEvent(body, signature, secret);

        if (!EVENT_SAFE_LIST.includes(event.type)) { return { Status: 'not_mapped' }; }

        return mapData(event.data.object);
    }

    return { processEvent };
});
