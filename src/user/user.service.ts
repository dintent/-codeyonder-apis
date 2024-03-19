import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { UpdateUserDto } from './dto/update-user.dto'
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find()
    if (!users || this.userModel.length == 0) {
      throw new NotFoundException('Nothing is found')
    }
    return users
  }

  async find(id: string) {
    const existingUser = await this.userModel.findById(id).exec()
    if (!existingUser) {
      throw new NotFoundException('Nothing is found')
    }
    return existingUser
  }

  async create(data: CreateUserDto): Promise<User> {
    const saltOrRound = 10
    const hashedPassword = await bcrypt.hashSync(data.password, saltOrRound)
    console.log(`hashed password is ${hashedPassword}`)
    const hashedData = {
      ...data,
      password: hashedPassword
    }
    console.log(hashedData)
    const createdUser = await new this.userModel(hashedData)
    return createdUser.save()
  }

  async update(data: UpdateUserDto, id: string): Promise<User> {
    const updatedBoard = await this.userModel.findByIdAndUpdate(id, data, {
      new: true,
    })
    if (!updatedBoard) {
      throw new NotFoundException(`The user is not found: ${id}`)
    }
    return updatedBoard
  }

  async delete(id: string): Promise<User> {
    const deletedBoard = await this.userModel.findByIdAndDelete(id)
    if (!deletedBoard) {
      throw new NotFoundException('The user is not found')
    }
    return deletedBoard
  }
}
