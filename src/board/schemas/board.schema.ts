import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { Document } from 'mongoose'

export type BoardDocument = Board & Document

@Schema({ timestamps: true })
export class Board extends Document {
  @ApiProperty({ description: 'name', example: 'cathy' })
  @Prop({ required: true })
  name: string

  @ApiProperty({ description: 'contents', example: 'please write here' })
  @Prop({ required: true })
  @IsString()
  @IsNotEmpty()
  contents: string

  // @IsNotEmpty()
  // @Prop({ required: true })
  // _id: number
}

export const BoardSchema = SchemaFactory.createForClass(Board)
