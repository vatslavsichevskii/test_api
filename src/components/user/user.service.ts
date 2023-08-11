import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import UserRepo from './user.repo';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepo,
    private jwtService: JwtService,
  ) {}
}
