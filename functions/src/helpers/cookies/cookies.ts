export class Cookies<T extends Record<string, unknown>> {
    private _data!: T;

    constructor(unmapped: string) { this.data = this.mapCookies(unmapped); }

    get data() { return this._data; }
    set data(mapped: T) { this._data = mapped; }

    private mapCookies(unmapped: string): T {
        return unmapped
            .split(';')
            .map((item) => item.split('='))
            .reduce((acc: Record<string, unknown>, [key, value]) => {
                acc[key.trim()] = value;

                return acc;
            }, {}) as T;
    }
}
