import defineHandler from '@/handlers/defineHandler';
import {exec, when} from '@/middlewares';
import { useContext } from '@/core';
import { logger } from '@/helpers';
import { ProcessStripeEvents } from '@/plugins/process-stripe-events';
import { PaymentEvent } from '@/handlers/webhookPayment/paymentEvent';


const getStripeEvent = exec(async (request, context) => {
    const { use, set } = useContext(context);

    logger.debug('processing stripe event');

    const processStripeEvents = use(ProcessStripeEvents);
    const event = await processStripeEvents.processEvent(request);

    set((prev) => ({ ...prev, event }));
});

const processPaidEvent = exec(async (_, context) => {
    logger.info(context.data);
    logger.info('processando pagamento paid');
});

const processFailedEvent = exec(async (request, context) => {
    logger.info('processando pagamento failed');
});

export default defineHandler(() => [
    getStripeEvent,
    when<PaymentEvent>(({ context }) => context.data.Status, {
        'paid': [processPaidEvent],
        'failed': [processFailedEvent],
    }),
]);
