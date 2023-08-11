import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import UserRepo from './user.repo';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRETKEY,
      signOptions: { expiresIn: '1000s' },
    }),
  ],
  providers: [UserResolver, UserService, UserRepo],
})
export class UserModule {}
