import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User extends Document {
  // @Prop({ unique: true })
  // @ApiProperty({ description: 'username', example: 'cathy' })
  // username: string

  @ApiProperty({ description: 'password', example: '1qa2ws' })
  @Prop()
  password: string

  @ApiProperty({ description: 'name', example: 'id' })
  @Prop({ unique: true })
  name: string
}

export const UserSchema = SchemaFactory.createForClass(User)
