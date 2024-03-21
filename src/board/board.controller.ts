import { ApiTags } from '@nestjs/swagger'
import { BoardService } from './board.service'
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  UnauthorizedException,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'
import { ConfigService } from '@nestjs/config'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { UserInfo } from 'src/decorators/user-info.decorator'

@Controller('board')
@ApiTags('board')
export class BoardController {
  constructor(
    private boardService: BoardService,
    private readonly configService: ConfigService,
  ) {}
  private readonly logger = new Logger(BoardController.name) // displays the controller's name on the CLI

  @Get()
  findAll() {
    this.logger.log('Logger_Test')
    return this.boardService.findAll()
  }

  @Get(':id')
  find(@Param('id') id: string) {
    // console.log((await this.boardService.find(id)).name)
    return this.boardService.find(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @UserInfo() userInfo,
    @Body(new ValidationPipe()) data: CreateBoardDto,
  ) {
    if (!userInfo) throw new UnauthorizedException()
    //enable validation-pipe for this method only
    return this.boardService.create(data)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @UserInfo() userInfo,
    @Body(new ValidationPipe()) data: UpdateBoardDto,
    @Param('id') id: string,
  ) {
    console.log(userInfo.username)
    return this.boardService.update(data, id, userInfo)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@UserInfo() userInfo, @Param('id') id: string) {
    return this.boardService.delete(id, userInfo)
  }
}
