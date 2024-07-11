import { Body, Controller, Inject, Post, ValidationPipe } from '@nestjs/common';
import { SignInDTO, SignUpDTO } from './auth.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(@Inject() private readonly authService: AuthService){}
  @Post('/signup')
  signup(@Body() signupDTO:SignUpDTO){
    return this.authService.signup(
      signupDTO.username,
      signupDTO.email,
      signupDTO.password
    );
  }
  @Post('/signin')
  signin(@Body() signinDTO:SignInDTO){
    return this.authService.signin(signinDTO.email, signinDTO.password);
  }
}
