import { logger } from '@/helpers/logger';

export async function delay(time: number, options?: { log?: boolean }) {
    const { log } = options || {};

    return new Promise<void>((resolve) => {
        let remainingTime = time / 1000;

        const interval = setInterval(() => {
            if (log) { logger.debug(`Faltam ${remainingTime} segundos...`); }

            remainingTime--;

            if (remainingTime <= 0) { clearInterval(interval); }
        }, 1000);

        setTimeout(() => {
            clearInterval(interval);
            resolve();
            if (log) { logger.debug('Finalizado!'); }
        }, time);
    });
}
