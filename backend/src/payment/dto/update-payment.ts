import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdatePaymentDTO {

    @IsString()
    @IsNotEmpty()
    owner_payment: string;

    @IsNumber()
    @IsNotEmpty()
    total_amount: number;

    description: string;
    
    date: string;
}