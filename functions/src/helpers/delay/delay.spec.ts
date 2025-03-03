import { logger } from '../logger';

import { delay } from './delay';

jest.mock('../logger', () => ({
    logger: {
        debug: jest.fn(),
    },
}));

describe('delay', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        jest.clearAllMocks();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('deve esperar o tempo especificado', async () => {
        const time = 2000; // 2 segundos
        const promise = delay(time);

        jest.advanceTimersByTime(time);

        await expect(promise).resolves.toBeUndefined();
    });

    it('deve logar as mensagens corretamente quando log é true', async () => {
        const time = 3000; // 3 segundos
        const promise = delay(time, { log: true });

        jest.advanceTimersByTime(1000);
        expect(logger.debug).toHaveBeenCalledWith('Faltam 3 segundos...');

        jest.advanceTimersByTime(1000);
        expect(logger.debug).toHaveBeenCalledWith('Faltam 2 segundos...');

        jest.advanceTimersByTime(1000);
        expect(logger.debug).toHaveBeenCalledWith('Faltam 1 segundos...');

        jest.advanceTimersByTime(1000);
        expect(logger.debug).toHaveBeenCalledWith('Finalizado!');

        await expect(promise).resolves.toBeUndefined();
    });

    it('não deve logar nada quando log é false ou não é fornecido', async () => {
        const time = 1000; // 1 segundo
        const promise = delay(time);

        jest.advanceTimersByTime(time);

        await expect(promise).resolves.toBeUndefined();
        expect(logger.debug).not.toHaveBeenCalled();
    });
});
