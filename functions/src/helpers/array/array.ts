export function shuffle<T>(array: Array<T>) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export function chooseNumber(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandom<T>(arr: T[]): T {
    const shuffled = shuffle<T>(arr);
    const chosen = chooseNumber(0, shuffled.length - 1);

    return shuffled[chosen];
}

export function getFilledArray(length: number) {
    return Array.from(Array(length), (_, index) => index);
}
