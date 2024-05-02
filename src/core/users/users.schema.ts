import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Score } from '~/core/scores/scores.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: Types.ObjectId;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: false, nullable: true })
  refreshToken: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Score' }] })
  scores: [Score];
}

export const UserSchema = SchemaFactory.createForClass(User);
