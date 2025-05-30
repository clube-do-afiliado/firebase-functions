import { DB } from '@/plugins';
import { useContext } from '@/core';
import { exec } from '@/middlewares';
import { getFirestoreInstance } from '@/services';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID } from '@/env';
import { type ShortLinkConfig, type ShortLinkData, ShortLink } from '@/domain/shortLink';

import defineHandler from '../defineHandler';

const generateShorUrl = exec(async (_, req, context) => {
    const { use, set } = useContext(context);

    const db = await use(DB);

    const { setItem } = await db(getFirestoreInstance({
        apiKey: API_KEY.value(),
        projectId: PROJECT_ID.value(),
        authDomain: AUTH_DOMAIN.value(),
    }));

    const shortLink = new ShortLink(req.body.data as ShortLinkConfig);

    const { hash, ...data } = shortLink.data;

    setItem<Omit<ShortLinkData, 'hash'>>({
        data,
        path: 'shortLinks',
        pathSegments: [hash],
    });

    set(() => ({ hash }));
});

export default defineHandler(() => [
    generateShorUrl,
]);
