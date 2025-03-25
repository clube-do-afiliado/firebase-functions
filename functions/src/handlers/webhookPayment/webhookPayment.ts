import defineHandler from '@/handlers/defineHandler';
import { exec } from '@/middlewares';
import { useContext } from '@/core';
import { logger } from '@/helpers';
import { ProcessStripeEvents } from '@/plugins/process-stripe-events';


const getStripeEvent = exec(async (request, context) => {
    const { use } = useContext(context);

    logger.debug('processing stripe event');

    await use(ProcessStripeEvents).processEvent(request);

    logger.info('event successfully processed');

    return;
});

export default defineHandler(() => [
    getStripeEvent,
]);
