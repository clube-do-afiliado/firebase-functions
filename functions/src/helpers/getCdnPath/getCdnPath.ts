type Size = 'medium' | 'small';

export function getCdnPath(imageName: string, size: Size) {
    return `https://cdn.clubedoafiliado.com/assets/images/${imageName}-${size}.avif`;
}
