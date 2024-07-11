import { Body, Controller, Inject, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/user.entity';
import { GetUser } from './get-user.decorator';

@Controller()
export class AuthController {
  constructor(@Inject() private readonly authService: AuthService) { }
  @Post('/signup')
  signup(@Body() signupDTO: SignUpDTO) {
    return this.authService.signup(
      signupDTO.username,
      signupDTO.email,
      signupDTO.password
    );
  }

  @Post('/signin')
  signin(@Body() signinDTO: SignInDTO) {
    return this.authService.signin(signinDTO.email, signinDTO.password);
  }
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: User) {
    return user;
  }
}
