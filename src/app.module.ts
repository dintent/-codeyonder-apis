import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { BoardModule } from './board/board.module'
import { LoggingMiddleware } from './middleware/logging.midleware'
import { UserModule } from './user/user.module';
import ConfigModule from './config'

@Module({
    imports: [BoardModule, ConfigModule(), UserModule], //Configuration module is a dynamic module so it must be used with brackets
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*') //register logging middleware and applies to all routes
    }
}
