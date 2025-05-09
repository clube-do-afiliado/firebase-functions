import { DB } from '@/plugins';
import { useContext } from '@/core';
import { exec, when } from '@/middlewares';
import { getFirestoreInstance } from '@/services';
import { PROJECT_ID, API_KEY, AUTH_DOMAIN } from '@/env';

import type { UserData } from '@/domain/user';

import defineHandler from '../defineHandler';

const updateUser = exec(async (req, context) => {
    const { use } = useContext(context);

    const db = await use(DB);

    const { setItem } = await db(getFirestoreInstance({
        apiKey: API_KEY.value(),
        projectId: PROJECT_ID.value(),
        authDomain: AUTH_DOMAIN.value(),
    }));

    const user = req.body.data.user;

    setItem<UserData>({
        data: user,
        path: 'users',
        pathSegments: [user.email],
    });
});

export default defineHandler((req) => [
    when(req.body.data.domain, {
        'user': [updateUser],
    }),
]);
