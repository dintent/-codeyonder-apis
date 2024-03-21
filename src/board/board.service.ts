import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Board, BoardDocument } from './schemas/board.schema'
import { User } from 'src/user/schemas/user.schema'

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}

  async findAll(): Promise<Board[]> {
    const boards = await this.boardModel.find()
    if (!boards || this.boardModel.length == 0) {
      throw new NotFoundException('Nothing is found')
    }
    return boards
  }

  async find(id: string) {
    const existingBoard = await this.boardModel.findById(id).exec()
    if (!existingBoard) {
      throw new NotFoundException('Nothing is found')
    }
    return existingBoard
  }

  async create(data: CreateBoardDto): Promise<Board> {
    const createdBoard = await new this.boardModel(data)
    return createdBoard.save()
  }

  async update(
    data: UpdateBoardDto,
    id: string,
    UserInfo: User,
  ): Promise<Board> {
    const board = await this.find(id)
    if (!board) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
    if (UserInfo.username !== board.name) {
      throw new UnauthorizedException()
    }
    const updatedBoard = await this.boardModel.findByIdAndUpdate(id, data, {
      new: true,
    })
    if (!updatedBoard) {
      throw new NotFoundException(`Blog is not found: ${id}`)
    }
    return updatedBoard
  }

  async delete(id: string, UserInfo: User): Promise<Board> {
    const board = await this.find(id)
    console.log(board.name)
    if (!board) throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
    if (UserInfo.username !== board.name) {
      throw new UnauthorizedException()
    }
    const deletedBoard = await this.boardModel.findByIdAndDelete(id)
    if (!deletedBoard) {
      throw new NotFoundException('The board is not found')
    }
    return deletedBoard
  }
}
