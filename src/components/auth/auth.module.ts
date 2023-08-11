import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import AuthRepo from './auth.repo';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from 'src/services/config/config.services';
const config = new ConfigService();

@Module({
  imports: [],
  providers: [AuthResolver, AuthService, AuthRepo],
})
export class AuthModule {}
