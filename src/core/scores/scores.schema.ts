import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '~/core/users/users.schema';

export type ScoreDocument = HydratedDocument<Score>;

@Schema()
export class Score {
  _id: Types.ObjectId;

  @Prop({ required: true })
  string: string;

  @Prop({ required: true })
  score: number;

  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user: Types.ObjectId;
}

export const ScoreSchema = SchemaFactory.createForClass(Score);
