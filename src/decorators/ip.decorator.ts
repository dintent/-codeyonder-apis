import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const Ip = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): any => {
        const request = ctx.switchToHttp().getRequest()
        return request.ip
    },
)
