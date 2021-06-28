import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePaymentDTO {
    @IsString()
    @IsNotEmpty()
    owner_payment: string;

    @IsNumber()
    @IsNotEmpty()
    total_amount: number;

    description: string;

    balance: number;
    
    date: string;
}