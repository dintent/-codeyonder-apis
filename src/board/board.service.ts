import { Injectable } from '@nestjs/common'
import { CreateBoardDto } from './dto/create-board.dto'
import { UpdateBoardDto } from './dto/update-board.dto'

@Injectable()
export class BoardService {
    private boards = [
        { id: 1, name: 'smith', contents: 'content1' },
        { id: 2, name: 'kevin', contents: 'content1' },
        { id: 3, name: 'ryan', contents: 'content1' },
    ]

    findAll() {
        return this.boards
    }

    find(id: number) {
        const index = this.boards.findIndex((board) => board.id === id)
        return this.boards[index]
    }

    create(data: CreateBoardDto) {
        // const lastIndex = this.boards.length
        // const newRecord = { id: lastIndex + 1, ...data }
        // this.boards.push(newRecord)
        const newBoard = { id: this.getNextId(), ...data }
        this.boards.push(newBoard)
        return newBoard
    }

    update(data: UpdateBoardDto, id: number) {
        const index = this.getBoardId(id)
        if (index > -1) {
            this.boards[index] = {
                ...this.boards[index],
                ...data,
            }
            return this.boards[index]
        }
        return null
    }

    delete(id: number) {
        const index = this.getBoardId(id)

        if (index > -1) {
            const boardDeleted = this.boards[index]
            this.boards.splice(index, 1)
            return boardDeleted
        }
        return null
    }

    getBoardId(id: number) {
        return this.boards.findIndex((board) => board.id === id)
    }

    getNextId() {
        // sorting algorithm
        return this.boards.sort((a, b) => b.id - a.id)[0].id + 1
    }
}
