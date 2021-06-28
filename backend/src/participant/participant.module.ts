import { Module, forwardRef } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { Participant, ParticipantSchema } from './schema/participant.schema'

import { ParticipantController } from './participant.controller';
import { ParticipantService } from './participant.service';

import { PaymentModule } from 'src/payment/payment.module';

@Module({
    imports: [ MongooseModule.forFeature([{ name: Participant.name, schema: ParticipantSchema }]), forwardRef( ()=> PaymentModule ) ],
    providers: [ ParticipantService ],
    controllers: [ ParticipantController ],
    exports: [ ParticipantService ]
})
export class ParticipantModule { }
