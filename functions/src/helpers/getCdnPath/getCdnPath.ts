type Size = 'medium' | 'small';

export function getCdnPath(imageName: string, size: Size) {
    return `https://cdn-web-80894.web.app/assets/images/${imageName}-${size}.avif`;
}
