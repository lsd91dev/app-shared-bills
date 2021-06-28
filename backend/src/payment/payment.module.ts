import { forwardRef, Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { Payment, PaymentSchema } from './schema/payment.schema';

import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';


import { ParticipantModule } from 'src/participant/participant.module';

@Module({
    imports: [ MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]), forwardRef( ()=> ParticipantModule ) ],
    providers: [ PaymentService ],
    controllers: [ PaymentController ],
    exports: [ PaymentService ]
})
export class PaymentModule {}
