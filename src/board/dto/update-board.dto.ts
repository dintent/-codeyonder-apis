import { IsOptional, MaxLength, MinLength } from 'class-validator'

export class UpdateBoardDto {
    @MinLength(2)
    @MaxLength(20)
    @IsOptional()
    name?: string

    @IsOptional()
    contents?: string
}
// export class UpdateBoardDto extends PartialType(CreateBoardDto) {} // all fields are optional!
// export class UpdateBoardDto extends PickType(CreateBoardDto, ['name']) {}
// export class UpdateBoardDto extends OmitType(CreateBoardDto, ['name']) {}
