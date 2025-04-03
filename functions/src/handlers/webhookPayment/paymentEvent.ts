export interface PaymentEvent {
    Customer: Customer | null | undefined
    Plan: Plan | null | undefined
    Status: 'paid' | 'failed' | 'not_mapped'
}

interface Customer {
    Email: string | null | undefined
    Name: string | null | undefined
}

interface Plan {
    id: string | undefined
}


