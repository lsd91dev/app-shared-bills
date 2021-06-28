import { Injectable } from '@nestjs/common';

// mongoose 
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schema/payment.schema';

// dto
import { CreatePaymentDTO } from './dto';

@Injectable()
export class PaymentService {

    constructor(@InjectModel(Payment.name) private paymentModel : Model <PaymentDocument> ) { }

    async getPayments (): Promise <Payment []>{
        return await this.paymentModel.find();       
    }

    async getPayment ( id: string ): Promise <Payment> {
        return await this.paymentModel.findById(id);
    }

    async createPayment( payment: CreatePaymentDTO ): Promise <Payment> {
        const new_payment = new this.paymentModel( payment );
        return await new_payment.save();
}

}
