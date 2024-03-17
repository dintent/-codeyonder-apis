import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('yonder board')
    .setDescription('yonder board APIs')
    .setVersion('1.0')
    .addTag('board') // the mapping to the one in @ApiTags in the board controller
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document) // localhost:3000/api

  await app.listen(3000)
}
bootstrap()
