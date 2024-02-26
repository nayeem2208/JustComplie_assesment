
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<any> {
    const admin = await this.userService.getUserByUsername(username);
    if (admin[0] && admin[0].password == password) {
      const payload = { username: admin[0].username, sub: admin[0]._id};
      console.log(payload,'payload')
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }
}
