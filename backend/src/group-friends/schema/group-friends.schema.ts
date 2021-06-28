import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GroupFriendsDocument = GroupFriends & Document;

@Schema()
export class GroupFriends {
  @Prop({ required: true })
  owner: string;

  @Prop()
  users: string;

  @Prop(
    { default: 0 }
  )
  total_payment: number;
}

export const GroupFriendsSchema = SchemaFactory.createForClass(GroupFriends);