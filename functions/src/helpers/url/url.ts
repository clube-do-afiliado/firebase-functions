export function serialize(data: Record<string, string>) {
    const url = new URLSearchParams(data).toString();
    return url;
}
