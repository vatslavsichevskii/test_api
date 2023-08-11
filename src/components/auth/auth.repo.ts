import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/model/user.entity';
import { IRegisterData } from 'src/interfaces/register-data.interface';

@Injectable()
class AuthRepo {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  public async create(userData: any): Promise<User> {
    const user = await this.repo.save(userData);
    return user;
  }

  public async findOneByEmail(email: string): Promise<User> {
    const user = await this.repo.findOneBy({ email });
    return user;
  }
}

export default AuthRepo;
