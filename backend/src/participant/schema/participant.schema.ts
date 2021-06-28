import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type ParticipantDocument = Participant & Document;

@Schema()
export class Participant {

  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 0 })
  amount: string;

  @Prop({ })
  owe: number;

  @Prop({ default: 0 })
  balance: number;

  @Prop()
  payment_id: string;

}

export const ParticipantSchema = SchemaFactory.createForClass(Participant);