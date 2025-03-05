import os from 'os';

export const PATH_MAP: Partial<{ [X in NodeJS.Platform]: string }> = {
    win32: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // macOS
    linux: '/usr/bin/google-chrome ou /usr/bin/chromium-browser',
};

export function getChromePath() {
    const platform = os.platform();

    const path = PATH_MAP[platform as keyof typeof PATH_MAP];

    if (!path) { return 'Unidentified operating system'; }

    return path;
}
