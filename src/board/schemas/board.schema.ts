import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsNotEmpty, IsString } from 'class-validator'
import { Document } from 'mongoose'

export type BoardDocument = Board & Document

@Schema({ timestamps: true })
export class Board extends Document {
  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  contents: string
}

export const BoardSchema = SchemaFactory.createForClass(Board)
