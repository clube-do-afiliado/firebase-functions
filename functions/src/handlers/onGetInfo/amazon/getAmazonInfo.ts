import type { Info } from '../Info';

export function getAmazonInfo(): Info {
    const title = document.getElementById('title');

    const price = document.getElementById('attach-base-product-price') as HTMLInputElement;

    const imageContainer = document.getElementById('imgTagWrapperId');

    const image = imageContainer?.querySelector('img');

    return {
        title: (title?.textContent || '').trim(),
        price: (price?.value || '').trim(),
        img: image?.getAttribute('src') || '',
    };
}
