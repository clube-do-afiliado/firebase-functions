import defineHandler from '@/handlers/defineHandler';
import { exec, print } from '@/middlewares';
// import { useContext } from '@/core';
// import { SlackNotify } from '@/plugins';
import { logger } from '@/helpers';

const printTeste = print({ brand: 'amazon' });
// eslint-disable-next-line
const getStripeEvent = exec(async (_, context) => {
    // const { use } = useContext(context);
    // use(SlackNotify);

    logger.info('getStripeEvent');

    return;
});
// eslint-disable-next-line
export default defineHandler((req) => [
    printTeste,
    getStripeEvent,
]);
