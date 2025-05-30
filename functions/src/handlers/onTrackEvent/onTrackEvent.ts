import { DB } from '@/plugins';
import { useContext } from '@/core';
import { exec } from '@/middlewares';
import { uuid } from '@/helpers/uuid';
import { logger } from '@/helpers/logger';
import { getFirestoreInstance } from '@/services';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID } from '@/env';

import { type EventData, type EventConfig, Event } from '@/domain/event';

import defineHandler from '../defineHandler';

const trackEvent = exec(async (_, req, context) => {
    const { use, set } = useContext(context);

    const db = await use(DB);

    const { setItem } = await db(getFirestoreInstance({
        apiKey: API_KEY.value(),
        projectId: PROJECT_ID.value(),
        authDomain: AUTH_DOMAIN.value(),
    }));

    logger.debug(req.body.data);

    const event = new Event(req.body.data as EventConfig);

    setItem<EventData>({
        data: event.data,
        path: 'events',
        pathSegments: [uuid()],
    });

    set(() => ({ status: 'ok' }));
});

export default defineHandler(() => [
    trackEvent,
]);
