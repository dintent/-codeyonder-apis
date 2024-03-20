import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginUserDto {
  @MinLength(2)
  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  username: string

  @IsString()
  @MinLength(4)
  @IsNotEmpty()
  password: string
}
