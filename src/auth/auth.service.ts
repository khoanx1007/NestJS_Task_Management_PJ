import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject() private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signup(username: string, email: string, password: string) {
    if (await this.usersService.checkExistsUser(email, username)) {
      throw new ConflictException('username or email already exists');
    }
    return this.usersService.create({ username, email, password });
  }

  async signin(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload: JwtPayload = { email: user.email, id: user.id };
      const accessToken = this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
