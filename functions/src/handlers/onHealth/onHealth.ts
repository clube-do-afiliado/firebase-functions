import { exec } from '@/middlewares';
import { useContext } from '@/core';

import defineHandler from '../defineHandler';

const handlerHealth = exec(async (_, __, context) => {
    const { set, env } = useContext(context);

    set(() => ({
        message: 'This app is healthy',
        env: env.nodeEnv,
        release: env.release,
    }));
});

export default defineHandler(() => [
    handlerHealth,
]);
