import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class UpdateUserDto {
  @MinLength(8)
  @MaxLength(10)
  @IsNotEmpty()
  username?: string

  @MinLength(8)
  @IsNotEmpty()
  password?: string
}

// export class UpdateBoardDto extends PartialType(CreateBoardDto) {} // all fields are optional!
// export class UpdateBoardDto extends PickType(CreateBoardDto, ['name']) {}
// export class UpdateBoardDto extends OmitType(CreateBoardDto, ['name']) {}
