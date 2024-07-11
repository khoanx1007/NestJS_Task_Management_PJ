import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.stragegy';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports:
  [
    TypeOrmModule.forFeature(),
    UsersModule,
    TasksModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: '7200s'
      },
    })
  ],
  controllers:[AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
