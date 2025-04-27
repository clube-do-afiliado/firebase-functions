const osList = [
    // Windows 10
    'Windows NT 10.0; Win64; x64',
    // Windows 11
    'Windows NT 11.0; Win64; x64',
    // MacOS Ventura (13.x)
    'Macintosh; Intel Mac OS X 13_3_1',
    // MacOS Sonoma (14.x)
    'Macintosh; Intel Mac OS X 14_0_0',
    // Linux Ubuntu
    'X11; Ubuntu; Linux x86_64',
    // Linux genérico
    'X11; Linux x86_64',
];


export function getRandomDesktopUserAgent() {
    const browsers = [
        {
            name: 'Chrome',
            base: 'Mozilla/5.0',
            engine: 'AppleWebKit/537.36 (KHTML, like Gecko)',
            browserBase: 'Chrome',
            safari: 'Safari/537.36',
            versionMajor: 122 + Math.floor(Math.random() * 2), // Chrome 122 ou 123
        },
        {
            name: 'Firefox',
            base: 'Mozilla/5.0',
            engine: 'Gecko/20100101',
            browserBase: 'Firefox',
            versionMajor: 123 + Math.floor(Math.random() * 2), // Firefox 123 ou 124
        },
        {
            name: 'Edge',
            base: 'Mozilla/5.0',
            engine: 'AppleWebKit/537.36 (KHTML, like Gecko)',
            browserBase: 'Chrome',
            safari: 'Safari/537.36',
            edgeBase: 'Edg',
            versionMajor: 122 + Math.floor(Math.random() * 2), // Edge 122 ou 123
        },
        {
            name: 'Safari',
            base: 'Mozilla/5.0',
            engine: 'AppleWebKit/605.1.15 (KHTML, like Gecko)',
            safariVersion: 'Version/16.3',
            browserBase: 'Safari/605.1.15',
        },
    ];

    const os = osList[Math.floor(Math.random() * osList.length)];
    const browser = browsers[Math.floor(Math.random() * browsers.length)];

    let userAgent = '';

    /* eslint-disable */
    if (browser.name === 'Chrome') {
        userAgent = `${browser.base} (${os}) ${browser.engine} ${browser.browserBase}/${browser.versionMajor}.0.0.0 ${browser.safari}`;
    } else if (browser.name === 'Firefox') {
        userAgent = `${browser.base} (${os}; rv:${browser.versionMajor}.0) ${browser.engine} ${browser.browserBase}/${browser.versionMajor}.0`;
    } else if (browser.name === 'Edge') {
        userAgent = `${browser.base} (${os}) ${browser.engine} ${browser.browserBase}/${browser.versionMajor}.0.0.0 ${browser.safari} ${browser.edgeBase}/${browser.versionMajor}.0.2420.65`;
    } else if (browser.name === 'Safari') {
        userAgent = `${browser.base} (${os}) ${browser.engine} ${browser.safariVersion} ${browser.browserBase}`;
    }
    /* eslint-enable */

    return userAgent;
}
