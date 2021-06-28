import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { errorMessageServerDown } from 'src/helpers/error-message';
import { CreateParticipantDTO } from './dto/create-participant-dto';
import { ParticipantService } from './participant.service';
import { PaymentService } from '../payment/payment.service';
import { ValidationCreateParticipantDTOPipe } from './pipes/validation-create-participant-dto.pipe';

@Controller('participant')
export class ParticipantController {

    constructor(private readonly _participantService: ParticipantService, private readonly _paymentService: PaymentService){ }

    @Post('new')
    async createParticipant( @Res() res: Response, @Body (  new ValidationCreateParticipantDTOPipe() ) payload: CreateParticipantDTO ): Promise <Response> {
 
        const { payment_id } = payload;

            try {

                const participant = await this._participantService.createParticipant( payload );

                const participants = await this._participantService.getAllParticipantsByPaymentId( payment_id );

               /*  participants.forEach( participant => {

                }) */

            return res.status( HttpStatus.CREATED ).json({
                participant
            })
        }catch( error ){
            console.log( error )
            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: errorMessageServerDown
            })
        }
    }
}