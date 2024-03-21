import {
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common'
import { AppService } from './app.service'
import { Ip } from './decorators/ip.decorator'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { AuthService } from './auth/auth.service'

@Controller('api')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @Get('hello')
  getHello(@Query('value') name: string): string {
    return this.appService.getHello(name)
  }

  @Get()
  getIp(@Ip() ip: string): string {
    return `testing the IP decorator: ${ip}`
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(req)
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req) {
    return req.user
  }
}
