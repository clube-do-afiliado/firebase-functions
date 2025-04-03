export interface PaymentEvent {
    Plan?: Plan;
    Customer?: Customer;
    Status: 'paid' | 'failed' | 'not_mapped'
}

interface Customer {
    Email?: string;
    Name?: string;
}

interface Plan {
    id?: string;
}


