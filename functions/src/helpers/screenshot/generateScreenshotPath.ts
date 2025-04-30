import fs from 'fs';
import path from 'path';

export function generateScreenShotPath(name: string) {
    const dir = path.resolve(__dirname, '../../screenshots');

    if (!fs.existsSync(dir)) { fs.mkdirSync(dir, { recursive: true }); }

    return path.resolve(dir, name);
}
