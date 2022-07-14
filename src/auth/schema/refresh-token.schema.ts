import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {
  @Prop()
  userId: string;

  @Prop()
  refreshToken: string;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
