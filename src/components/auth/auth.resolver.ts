import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-auth.input';
import { RegisterInput } from './dto/register-auth.input';
import { User } from 'src/model/user.entity';
import { ILoginRes } from 'src/interfaces/login-res.interface';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation('login')
  async login(@Args('input') input: LoginInput): Promise<ILoginRes> {
    try {
      return await this.authService.login(input);
    } catch (err) {
      throw err;
    }
  }

  @Mutation('register')
  async register(@Args('input') input: RegisterInput): Promise<User> {
    try {
      return await this.authService.register(input);
    } catch (err) {
      throw err;
    }
  }
}
