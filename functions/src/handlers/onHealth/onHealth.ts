import { exec } from '@/middlewares';
import defineHandler from '../defineHandler';
import { useContext } from '@/core';

const handlerHealth = exec(async (_, __, context) => {
    const { set, env } = useContext(context);

    set(() => `This app is healthy - ${env.nodeEnv}`);
});

export default defineHandler(() => [
    handlerHealth,
]);
