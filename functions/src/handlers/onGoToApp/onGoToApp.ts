
import { DB } from '@/plugins';
import { useContext } from '@/core';
import { exec } from '@/middlewares';
import { getFirestoreInstance } from '@/services';
import { API_KEY, AUTH_DOMAIN, PROJECT_ID } from '@/env';

// import defineRedirectHandler from '../defineRedirectHandler';
import defineHandler from '../defineHandler';
// import { logger } from '@/helpers/logger';
import { decode } from '@/helpers/jwt';
import { UserData } from '@/domain/user';
import { serialize } from '@/helpers/url/url';

interface Data {
    url: string;
    token: string;
    user: UserData;
}

const getUser = exec(async (_, req, context) => {
    const { use, set } = useContext<Data>(context);

    const db = await use(DB);

    const { getItem } = await db(getFirestoreInstance({
        apiKey: API_KEY.value(),
        projectId: PROJECT_ID.value(),
        authDomain: AUTH_DOMAIN.value(),
    }));

    const { token } = req.body.data;

    const decodeUser = decode<UserData>(token);

    const user = await getItem<UserData>({
        path: 'users',
        pathSegments: [],
        filters: [{ field: 'email', operator: '==', value: decodeUser.email }],
    });

    if (!user) { return; }

    set(() => ({ user, token }));
});

const getUrl = exec(async (res, req, context) => {
    const { data, set, env } = useContext<Data>(context);

    if (!data.user) {
        res.status(404).send('User not found');
        return;
    }

    const isAdmin = data.user.roles.includes('admin');

    const url = [
        isAdmin ? env.url.backoffice : env.url.admin,
        '?',
        serialize({ token: data.token as string }),
    ].join('');

    set((prev) => ({ ...prev, url }));
});

export default defineHandler(() => [
    getUser,
    getUrl,
]);
