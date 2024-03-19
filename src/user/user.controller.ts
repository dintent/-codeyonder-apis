import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'
import { Body, Controller, Get, Post } from '@nestjs/common'

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // signup() {}
  // login() {}
  // me() {}

  @Get()
  getUsers() {}

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userService.create(data)
  }
}
