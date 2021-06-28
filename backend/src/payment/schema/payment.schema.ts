import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema()
export class Payment {
  
  _id: string;

  @Prop({ required: true })
  owner_payment: string;

  @Prop({ required: true, default: 0 })
  total_amount: string;

  @Prop()
  description: string;

  @Prop()
  date: string;

}

export const PaymentSchema = SchemaFactory.createForClass(Payment);