export function sanitizeCurrency(value: string) {
    return Number(value.split('R$')[1]
        .replace('.', '')
        .replace(',', '.'));
}
