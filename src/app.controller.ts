import { Controller, Get, Query } from '@nestjs/common'
import { AppService } from './app.service'

@Controller('api')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('hello')
    getHello(@Query('value') name: string): string {
        return this.appService.getHello(name)
    }
}
