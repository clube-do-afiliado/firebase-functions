import jwt from 'jsonwebtoken';

export function decode<T>(token: string) {
    return jwt.decode(token) as T;
}
