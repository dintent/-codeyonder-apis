import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { User } from 'src/user/schemas/user.schema'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.getUserByUsername(username)
    if (user) {
      const match = await compare(password, user.password)
      if (match) {
        return user
      } else {
        return null
      }
    }
    return null // to align with interceptor, set it as null
  }

  async login(user: User) {
    const payload = { username: user.username }
    return { accessToken: this.jwtService.sign(payload) }
  }
}
