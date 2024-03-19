import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @MinLength(8)
  @MaxLength(10)
  @IsNotEmpty()
  username: string

  @MinLength(8)
  @IsNotEmpty()
  password: string
}
