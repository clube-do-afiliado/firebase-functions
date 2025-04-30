export function getFormatDate(date: Date) {
    const pad = (n: number) => String(n).padStart(2, '0');

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}-${month}-${year}T${hours}-${minutes}-${seconds}`;
}
