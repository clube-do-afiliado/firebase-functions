import { Timestamp } from 'firebase/firestore';

import type { ShortLinkData, ShortLinkConfig } from './ShortLinkData';
import { hash } from '@/helpers/hash';

export default class ShortLink {
    public data: ShortLinkData;

    constructor(partial: Pick<ShortLinkConfig, 'storeId' | 'originalUrl'>) {
        this.data = {
            ...partial,
            hash: hash(partial.originalUrl),
            createdAt: Timestamp.fromDate(new Date()),
        };
    }
}
