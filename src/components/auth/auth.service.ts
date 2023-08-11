import { Injectable } from '@nestjs/common';
import AuthRepo from './auth.repo';
import { compareSync, hashSync } from 'bcrypt';
import { RegisterInput } from './dto/register-auth.input';
import { LoginInput } from './dto/login-auth.input';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/model/user.entity';
import { ILoginRes } from 'src/interfaces/login-res.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepo: AuthRepo,
    private jwtService: JwtService,
  ) {}

  private hashData(data: string | Buffer) {
    return hashSync(data, 8);
  }

  private compareData(data: string | Buffer, enc: string) {
    return compareSync(data, enc);
  }

  private createJwt(payload: any): string {
    return this.jwtService.sign(payload);
  }

  public async register({
    email,
    name,
    password,
    role
  }: RegisterInput): Promise<User> {
    try {
      const isuserExists = await this.authRepo.findOneByEmail(email);

      if (isuserExists) throw new Error('USER_ALREADY_EXISTS');

      const newPassword = this.hashData(password);

      const newUser = await this.authRepo.create({
        email,
        name,
        role,
        passwordHash: newPassword,
      });

      return newUser;
    } catch (err) {
      throw err;
    }
  }

  public async login({ email, password }: LoginInput): Promise<ILoginRes> {
    try {
      const user: any = await this.authRepo.findOneByEmail(email);

      if (!user || (user && !this.compareData(password, user.passwordHash)))
        throw new Error('INCORRECT_CREDENTUALS');

      const payload = {
        id: user._id,
        isModerator: user.role == 'moderator',
      };
      const accessToken = this.createJwt(payload);

      return {
        accessToken,
        user,
      };
    } catch (err) {
      throw err;
    }
  }
}
