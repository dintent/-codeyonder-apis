import { Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

export class LoggingMiddleware implements NestMiddleware {
    private readonly logger = new Logger()
    use(req: Request, res: Response, next: NextFunction) {
        const { method, originalUrl } = req
        const startTime = Date.now()
        res.on('finish', () => {
            const { statusCode } = res
            const responseTime = Date.now() - startTime
            this.logger.log(
                `method: ${method}, url:${originalUrl}, status-code:${statusCode}, start:${startTime}, response-time:${responseTime}`,
            )
        }) // define what to do when the event happens
        next()
    }
}
