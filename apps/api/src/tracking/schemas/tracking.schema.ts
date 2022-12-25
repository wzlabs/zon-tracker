import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Exclude, Expose, Transform } from 'class-transformer';

export type TrackingDocument = HydratedDocument<Tracking>;

@Schema()
export class Tracking {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  user_id: string;

  @Prop()
  work_day: number;

  @Prop()
  start_time: number;

  @Prop()
  nb_of_seconds: number;

  @Prop()
  screenshots?: string;

  @Prop()
  created_date: number;
}

export const TrackingSchema = SchemaFactory.createForClass(Tracking);
