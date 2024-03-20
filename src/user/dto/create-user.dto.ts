import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  username: string

  @MinLength(4)
  @IsNotEmpty()
  password: string
}
