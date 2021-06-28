import { Post, Res, Req, Body, HttpStatus, Get, Param } from '@nestjs/common';
import { Response } from 'express';
import { Controller } from '@nestjs/common';

import { CreatePaymentDTO } from './dto';
import { PaymentService } from './payment.service';

import { errorMessageServerDown } from 'src/helpers/error-message';
import { ValidationCreatePaymentDTOPipe } from './pipes/validation-create-payment-dto.pipe';
import { ValidationParseObjectIdPipe } from './pipes/validation-parse-object-id.pipe';
import { ParticipantService } from 'src/participant/participant.service';
import { BalanceInterface } from 'src/interfaces/balance.interface';
import { DebtorInterface } from 'src/interfaces/debtor.interface';


@Controller('payment')
export class PaymentController {

    constructor(private readonly _paymentService: PaymentService, private _participantService: ParticipantService) { }

    @Get()
    async getPayments( @Res() res: Response ): Promise <Response> {
        try {
            const payments = await this._paymentService.getPayments();
            const payments_id = payments.map( payment => payment._id );

            const participants = await this._participantService.getAllParticipants(payments_id);
            const total_balance = this.createTotalBalance(payments, participants);

            const debtors = this.createDebtorList(payments, participants);


           return res.status(HttpStatus.OK).json({
            payments,
            participants,
            total_balance,
            debtors
        })
    
    }catch( error ){
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: { message: 'Could not retrieve information from server. Please try again later'}
    }) 
    }
}

    @Get(':id')
    async getPayment( @Param('id', new ValidationParseObjectIdPipe()) id: string, @Res( ) res: Response ): Promise<Response> {
        try {
            const payment = await this._paymentService.getPayment( id );
            return res.status(HttpStatus.OK).json({
                payment
            })
        }catch( error ){
            console.log( error )
            return res.status(HttpStatus.BAD_REQUEST).json({

            })
        }
    }

    @Post('new')
    async createPayment( @Res() res: Response, @Body ( new ValidationCreatePaymentDTOPipe()) payload: CreatePaymentDTO ): Promise <Response> { 
        try {
            const payment = await this._paymentService.createPayment( payload );
            return res.status( HttpStatus.CREATED ).json({
                payment
            })
        }catch( error ){
            console.log( error )
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: errorMessageServerDown
            })
        }
    }



    createDebtorList( payments, participants ) : DebtorInterface [] {
        let debtors : DebtorInterface[] = [];

        participants.forEach( ( participant ) => {
            let dummy: DebtorInterface = {
                payer: '',
                debtor_name: participant.name,
                amount: parseInt(participant.amount),
                payment_id: participant.payment_id
            };
            if ( debtors.length === 0 ){ debtors.push( dummy ); } 
            
            payments.forEach( payment => {
                if( dummy.payment_id.includes(payment._id) ) {
                    
                    if( debtors[0].payer.length === 0 ){
                        debtors[0].payer = payment.owner_payment; 
                        return;
                    }
                    dummy.payer = payment.owner_payment;
                    
                    
                    console.log(participant);
                    
                    debtors.forEach(  (debtor, index) => {
                        if( debtor.debtor_name.includes( dummy.debtor_name ) && debtor.payer.includes( dummy.payer) ) {
            
                            debtor.amount = debtor.amount + dummy.amount
                            return;
                        }

                        if( debtors.length === ( index + 1 ) ){ debtors.push( dummy ); return; }
                    })
                    
                }
            })
            
        });
    return debtors;
}


    createTotalBalance( payments, participants): BalanceInterface [] {
        let total_balance : BalanceInterface[] = [];

        total_balance = this.getBalanceFromPayments( payments, total_balance );
        total_balance = this.getBalanceFromParticipants( participants, total_balance);
        return total_balance;
    }

    getBalanceFromPayments( payments , total_balance) : BalanceInterface[] {
        payments.forEach( ( payment ) => {

            let dummy: BalanceInterface = {
                name: payment.owner_payment,
                balance: parseInt(payment.total_amount)
            };

            if ( total_balance.length === 0 ){
                total_balance.push( dummy );
                return;
            } 

            total_balance.forEach( (item, index ) => {
                if ( item.name.includes(dummy.name) ) {
                    console.log(dummy.name);
                    let participant = item
                    participant.balance = participant.balance + dummy.balance;
                    return;
                }
                if( total_balance.length === ( index + 1 ) ){
                    total_balance.push(dummy);
                }
            });     
       });

       return total_balance;
    }

    getBalanceFromParticipants( participants, total_balance ): BalanceInterface[] {

        participants.forEach( ( participant ) => {

            let dummy: BalanceInterface = {
                name: participant.name,
                balance: parseInt(participant.amount) * - 1
            };

        total_balance.forEach( (item, index ) => {
            if ( item.name.includes(dummy.name) ) {
                let participant = item
                participant.balance = participant.balance + dummy.balance;
                return;
            }
            if( total_balance.length === ( index + 1 ) ){
                total_balance.push(dummy);
            }
        });     
       });
       return total_balance;
    }
}
