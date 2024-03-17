import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreateBoardDto {
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(20)
  @ApiProperty({
    description: 'name',
    required: true,
    example: 'kathleen',
  })
  name: string

  @IsNotEmpty()
  @ApiProperty({
    description: 'content',
    required: true,
    example: 'hello world!',
  })
  contents: string
}
