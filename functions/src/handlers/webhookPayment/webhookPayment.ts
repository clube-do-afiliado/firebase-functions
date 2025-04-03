import defineHandler from '@/handlers/defineHandler';
import { exec, when } from '@/middlewares';
import { useContext } from '@/core';
import { logger } from '@/helpers';
import { ProcessStripeEvents } from '@/plugins/process-stripe-events';
import { PaymentEvent } from '@/handlers/webhookPayment/paymentEvent';

const getStripeEvent = exec(async (request, context) => {
    const { use, set } = useContext<PaymentEvent>(context);

    logger.debug('processing stripe event');

    const processStripeEvents = use(ProcessStripeEvents);
    const event = await processStripeEvents.processEvent(request);

    set((prev) => ({ ...prev, ...event }));
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
    when<PaymentEvent>(({ context }) => {
        const status = context.data.Status;

        logger.info('status:', status);

        return status;
    }, {
        'paid': [processPaidEvent],
        'failed': [processFailedEvent],
    }),
]);
