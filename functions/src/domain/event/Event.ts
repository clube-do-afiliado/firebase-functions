import { Timestamp } from 'firebase/firestore';

import type { EventData, EventConfig } from './EventData';

export default class Event {
    public data: EventData;

    constructor(partial: Omit<EventConfig, 'createdAt'>) {
        this.data = {
            name: partial.name,
            storeId: partial.storeId,
            productId: partial.productId || '',
            utmSource: partial.utmSource || 'others',
            utmCampaign: partial.utmCampaign || '',
            anonymousId: partial.anonymousId,
            createdAt: Timestamp.fromDate(new Date()),
        };
    }
}
