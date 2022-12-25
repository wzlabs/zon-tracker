import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    const passwordHash = await bcrypt.hash(pass, user.salt);
    if (!user) {
      return null;
    }

    if (user.password === passwordHash) {
      // const { password, ...result } = user;
      // user['_id'].toString();
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      userId: user.userId,
      accessToken: this.jwtService.sign(payload),
      loginProvider: user.loginProvider,
      userData: {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        isStaff: user.isStaff,
        isActive: user.isActive,
        isSuperuser: user.isSuperuser,
        lastLogin: user.lastLogin,
        dateJoined: user.dateJoined,
      },
    };
  }
}
