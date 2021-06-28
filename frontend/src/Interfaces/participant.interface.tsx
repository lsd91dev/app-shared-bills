export interface ParticipantInterface {
    _id: string
    payment_id: string
    name: string
    amount: number
    owe?: number
    balance?: number
}