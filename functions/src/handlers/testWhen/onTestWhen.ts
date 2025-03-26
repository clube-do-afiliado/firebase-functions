import { when, print, exec } from '@/middlewares';

import { logger } from '@/helpers';

import defineHandler from '../defineHandler';
import { useContext } from '@/core';

interface Data {
    event: 'payment.success' | 'payment.faield' | 'payment.teste';
}

const getEvent = exec(async (_, context) => {
    const { set } = useContext<Data>(context);

    const event = 'payment.teste';

    logger.info({ event });

    set((prev) => ({ ...prev, event }));

    return;
});

const printSuccess = print({ state: 'foi' });
const printError = print({ state: 'não foi' });

export default defineHandler(() => [
    getEvent,
    when<Data>(({ context }) => context.data.event, {
        'payment.success': [printSuccess],
        'payment.faield': [printError],
    }),
]);
