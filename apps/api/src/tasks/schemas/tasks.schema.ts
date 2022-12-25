import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Exclude, Expose, Transform } from 'class-transformer';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  plan_id: string;

  @Prop()
  user_id: string;

  @Prop()
  assignee_id: string;

  @Prop()
  title: string;

  @Prop()
  desc: string;

  @Prop()
  completed: boolean;

  @Prop()
  completed_date: number;

  @Prop()
  created_date: number;

  // @Expose()
  // get id(): string {
  //   return this._id.toString();
  // }
}

export const TaskSchema = SchemaFactory.createForClass(Task);
