import type { Info } from '../Info';

export function getMercadoLivreInfo(): Info {
    const mainContainer = document.getElementById('ui-pdp-main-container');

    const productContainer = mainContainer?.querySelector('div > div > div');

    const rowContainer = productContainer?.getElementsByClassName('ui-pdp-container__row')[1];

    const image = rowContainer?.querySelector('figure > img');

    const title = rowContainer?.querySelector('H1');

    const price = rowContainer?.querySelector('[itemprop=\'price\']') as HTMLMetaElement;

    return {
        title: (title?.textContent || '').trim(),
        img: image?.getAttribute('src') || '',
        price: price?.content || '',
    };
}
