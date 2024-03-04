import { Controller, Get } from '@nestjs/common'

@Controller('user')
export class UserController {
    signup() {}
    login() {}
    me() {}

    @Get()
    getUsers() {}
}
