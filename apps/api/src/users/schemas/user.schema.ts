import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { Exclude, Expose, Transform } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;

  @Expose({ name: 'id' })
  @Transform(({ value }) => value.toString())
  _id: ObjectId;

  @Prop()
  userId: string;

  @Prop()
  username: string;

  @Prop()
  email: string;

  @Exclude()
  @Prop()
  password: string;

  @Prop()
  salt: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  groups: string;

  @Prop()
  userPermissions: string;

  @Prop()
  isStaff: boolean;

  @Prop()
  isActive: boolean;

  @Prop()
  isSuperuser: boolean;

  @Prop()
  verifiedEmail: boolean;

  @Prop()
  lastLogin: Date;

  @Prop()
  dateJoined: Date;

  @Prop()
  loginProvider: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
