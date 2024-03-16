import { Controller, Get, Query } from '@nestjs/common'
import { AppService } from './app.service'
import { Ip } from './decorators/ip.decorator'

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(@Query('value') name: string): string {
    return this.appService.getHello(name)
  }

  @Get()
  getIp(@Ip() ip: string): string {
    return `testing the IP decorator: ${ip}`
  }
}
