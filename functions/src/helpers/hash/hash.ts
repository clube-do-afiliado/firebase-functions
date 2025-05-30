import crypto from 'crypto';

export function hash(url: string, length = 6): string {
    const hash = crypto.createHash('sha256').update(url).digest('base64url');
    return hash.slice(0, length); // pega os primeiros N caracteres
}
