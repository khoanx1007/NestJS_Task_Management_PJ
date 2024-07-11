import { ConflictException, HttpStatus, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject() private readonly usersService: UsersService) {}

  async signup(username: string, email: string, password: string){

    if (await this.usersService.checkExistsUser(email, username)) {
      throw new ConflictException("username or email already exists");
    }
    return this.usersService.create({username, email, password});
  }

  async signin(email: string, password: string){
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return { message: 'Login success', status: HttpStatus.OK , user: user };
    }
    else{
      throw new UnauthorizedException('Invalid credentials');
    }
  }

}
