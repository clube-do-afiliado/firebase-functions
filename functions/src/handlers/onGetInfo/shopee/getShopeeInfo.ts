import type { Info } from '../Info';

export function getShopeeInfo(): Info {
    const productBriefing = document.getElementsByClassName('product-briefing')[0];

    const [images, infos] = productBriefing.getElementsByTagName('SECTION') as unknown as HTMLElement[];

    const title = infos.querySelector('div > div > span');

    const price = infos.querySelector('div > div > section > div > .items-center > div');

    const image = images.querySelector('div > div > div > picture > img');

    return {
        title: title?.textContent || '',
        img: image?.getAttribute('src') || '',
        price: price?.textContent || '',
    };
}
