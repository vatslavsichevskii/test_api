import {
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { compareSync } from 'bcrypt';
import { User } from 'src/model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WriterGuard {
  constructor(
    private readonly jwtService: JwtService,
        // @InjectRepository(User) private readonly repo: Repository<User>,
    ) {}

  async canActivate(context: ExecutionContext) {
    try {
      const ctx = GqlExecutionContext.create(context);
      const { req } = ctx.getContext();

      const token = req.header('authorization') as string;

      if (!token) throw new UnauthorizedException();

      this.jwtService.verify(token);
      const pd = this.jwtService.decode(token) as {
        id: string;
        isadmin: boolean;
      };

      // const user = await this.userModel.findOne({ _id: pd.id });

      // if (!user) throw new UnauthorizedException();
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  handleRequest(err, user, info: Error) {
    if (err || info) throw new HttpException('Unauthorized', 401);

    return user;
  }
}
