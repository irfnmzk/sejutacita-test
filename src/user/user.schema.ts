import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEmail, IsString } from 'class-validator';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  @IsString()
  firstName: string;

  @Prop()
  @IsString()
  lastName: string;

  @Prop()
  @IsString()
  @IsEmail()
  username: string;

  @Prop()
  @IsString()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
