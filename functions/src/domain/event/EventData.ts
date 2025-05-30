import type { Timestamp } from 'firebase/firestore';

export type EventName = 'rp_view' | 'ldp_view' | 'ldp_cta' | 'rp_sl' | 'ldp_sl' | 'original_sl';
export type EventSource = 'whatsapp' | 'telegram' | 'instagram' | 'others' | 'facebook' | 'youtube';

export interface EventData {
    storeId: string;
    productId?: string;
    anonymousId: string;

    name: EventName;
    createdAt: Timestamp;

    utmCampaign?: string;
    utmSource: EventSource;
}

export interface EventConfig extends Omit<EventData, 'createdAt' | 'utmSource'> {
    utmSource?: EventSource;
}
