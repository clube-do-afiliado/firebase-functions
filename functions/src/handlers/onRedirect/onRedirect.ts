
import { DB } from '@/plugins';
import { useContext } from '@/core';
import { exec } from '@/middlewares';
import { uuid } from '@/helpers/uuid';
import { Cookies } from '@/helpers/cookies';
import { getFirestoreInstance } from '@/services';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID } from '@/env';
import { type ShortLinkConfig } from '@/domain/shortLink';
import { Event, EventData, EventName, EventSource } from '@/domain/event';

import defineRedirectHandler from '../defineRedirectHandler';

interface Data {
    shortLink: ShortLinkConfig
}

function getEventName(config: ShortLinkConfig): EventName {
    const isSelf = new RegExp('/localhost|clubedoafiliado/g').test(config.originalUrl);

    if (isSelf && config.productId) { return 'ldp_sl'; }
    if (isSelf) { return 'rp_sl'; }

    return 'original_sl';
}

const getOriginalUrl = exec(async (_, req, context) => {
    const { use, set } = useContext<Data>(context);

    const db = await use(DB);

    const { getDocument } = await db(getFirestoreInstance({
        apiKey: API_KEY.value(),
        projectId: PROJECT_ID.value(),
        authDomain: AUTH_DOMAIN.value(),
    }));

    const hash = req.path.replace('/', '');

    const shortLink = await getDocument<ShortLinkConfig>({ path: 'shortLinks', id: hash });

    if (!shortLink) { return; }

    set(() => ({ shortLink, url: shortLink.originalUrl }));
});

const trackEvent = exec(async (res, req, context) => {
    const { use, data, set } = useContext<Data>(context);

    if (!data.shortLink) { return; }

    const db = await use(DB);

    const { setItem } = await db(getFirestoreInstance({
        apiKey: API_KEY.value(),
        projectId: PROJECT_ID.value(),
        authDomain: AUTH_DOMAIN.value(),
    }));

    const cookies = new Cookies<{ anonymousId: string }>(req.headers.cookie as string);

    const anonymousId = cookies.data.anonymousId || uuid();

    if (!cookies.data.anonymousId) {
        res.setHeader('Set-Cookie', `anonymousId=${anonymousId}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax`);
    }

    const query = req.query as { utm_source?: EventSource, utm_campaign?: string };

    const event = new Event({
        anonymousId,
        name: getEventName(data.shortLink),
        storeId: data.shortLink.storeId,
        productId: data.shortLink.productId,
        utmSource: query.utm_source,
        utmCampaign: query.utm_campaign,
    });

    setItem<EventData>({
        data: event.data,
        path: 'events',
        pathSegments: [uuid()],
    });

    set((prev) => ({ ...prev, status: 'ok' }));
});

export default defineRedirectHandler(() => [
    getOriginalUrl,
    trackEvent,
]);
