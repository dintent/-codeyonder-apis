import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { User, UserDocument } from './schemas/user.schema'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { LoginUserDto } from './dto/login-user.dto'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const hashedPassword = await this.encryptPassword(data.password)
    // console.log(`hashed password is ${hashedPassword}`)
    const hashedData = {
      ...data,
      password: hashedPassword,
    }
    // console.log(hashedData)
    const createdUser = await new this.userModel(hashedData)
    return createdUser.save()
  }

  async login(data: LoginUserDto): Promise<User> {
    const { username, password } = data
    const user = await this.userModel.findOne({ username: username })
    if (!user) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND)
    }
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED)
    }
    return user
  }

  async encryptPassword(password: string) {
    const saltOrRound: number = 10
    return bcrypt.hash(password, saltOrRound)
  }
}
