import {
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';

@Injectable()
export class ModeratorGuard {
  constructor(
    private readonly jwtService: JwtService,
        // @InjectRepository(User) private readonly repo: Repository<User>,
    ) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();

    const token = req.header('authorization').split('=')[1] as string;

    if (!token) throw new UnauthorizedException();

    try {
      this.jwtService.verify(token);
      const pd = this.jwtService.decode(token) as {
        id: string;
        isModerator: boolean;
      };

      if (!pd.isModerator) throw new UnauthorizedException();

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
