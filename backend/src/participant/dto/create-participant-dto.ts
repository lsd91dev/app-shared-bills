import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateParticipantDTO {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number;

    owe: number;
    
    balance: number;

    @IsNotEmpty()
    payment_id: string


}