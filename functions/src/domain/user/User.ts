import type { UserData } from './interface';

export default class User {
    constructor(private _data: UserData) {
        const errors = this.validateData(_data);

        if (errors.length) { throw new Error(); }

        this.data = this._data;
    }

    get data() { return this._data; }
    set data(user: UserData) { this._data = user; }

    protected validateData(data: UserData): string[] {
        const errors: string[] = [];

        if (!data.id) { errors.push(''); }

        return [];
    }
}
