import type { Info } from '../Info';

export function getMagazineLuizaInfo(): Info {
    const infoSection = document.getElementsByTagName('SECTION')[6];

    const title = document.querySelector('H1[data-testid="heading-product-title"]');
    const img = document.querySelector('img[data-testid="image-selected-thumbnail"]');
    const priceEl = infoSection.querySelector('p[data-testid="installment"]');

    return {
        title: title?.textContent || '',
        img: img?.getAttribute('src') || '',
        price: priceEl?.textContent || '',
    };
}
