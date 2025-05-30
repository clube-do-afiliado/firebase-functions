import type { Timestamp } from 'firebase/firestore';

export interface ShortLinkData {
    hash: string;
    originalUrl: string;
    createdAt: Timestamp;
}

export interface ShortLinkConfig extends Pick<ShortLinkData, 'originalUrl'> {
    storeId: string;
    productId?: string;
}
