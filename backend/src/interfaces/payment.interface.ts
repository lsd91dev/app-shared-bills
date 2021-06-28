import { UserInterface } from './user.interface';

export interface PaymentInterface {
    owner: UserInterface;
    payment_amount: number;
    description: string;
    date: string;
    shared_with: string;

}