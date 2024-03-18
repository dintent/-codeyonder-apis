import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ unique: true })
  username: string

  @Prop()
  password: string

  @Prop()
  name: string
}

export const UserSchema = SchemaFactory.createForClass(User)
