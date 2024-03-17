import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsNotEmpty, IsString } from 'class-validator'
import mongoose, { Document } from 'mongoose'

export type BoardDocument = Board & Document

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Board extends Document {
  @Prop({ required: true, unique: true })
  id: number

  @Prop({ required: true })
  name: string

  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  contents: string

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  updatedAt: Date

  @Prop({ default: new Date(), type: mongoose.Schema.Types.Date })
  createdAt: Date
}

export const BoardSchema = SchemaFactory.createForClass(Board)
