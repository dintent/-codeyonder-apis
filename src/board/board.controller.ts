import { ApiTags } from '@nestjs/swagger'
import { BoardService } from './board.service'
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common'

@Controller('board')
@ApiTags('board')
export class BoardController {
    constructor(private boardService: BoardService) {}

    @Get()
    findAll() {
        return this.boardService.findAll()
    }

    @Get(':id')
    find(@Param('id') id: number) {
        // console.log(typeof id)
        return this.boardService.find(Number(id))
    }

    @Post()
    create(@Body() data: any) {
        return this.boardService.create(data)
    }

    @Put(':id')
    update(@Body() data: any, @Param('id') id: number) {
        return this.boardService.update(data, Number(id))
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.boardService.delete(Number(id))
    }
}
