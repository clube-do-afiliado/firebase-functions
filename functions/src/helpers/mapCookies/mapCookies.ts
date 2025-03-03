
import type { Cookie, CookieData } from 'puppeteer';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapCookies(cookies: any): CookieData[] {
    return (Object.values(cookies) as Cookie[])
        .filter((cookie: Cookie) => cookie.name && cookie.value && cookie.domain)
        .map((cookie: Cookie) => ({
            name: cookie.name,
            value: cookie.value,
            domain: cookie.domain.startsWith('.') ? cookie.domain : `.${cookie.domain}`,
            path: cookie.path || '/',
            expires: cookie.expires > 0 ? Math.round(cookie.expires) : undefined,
            httpOnly: cookie.httpOnly || false,
            secure: cookie.secure || false,
            sameSite: 'Lax',
        }));
}
