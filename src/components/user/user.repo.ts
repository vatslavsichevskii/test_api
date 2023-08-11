import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IMessage } from 'src/interfaces/message.interface';
import { IUserCreate } from 'src/interfaces/user-create.interface';
import { User } from 'src/model/user.entity';
import { Repository } from 'typeorm';

@Injectable()
class UserRepo {
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
  ) {}

  // async createUser(input: any): Promise<User> {
  //   try {
  //     const user = await this.repo.save(input);
  //     return user;
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }

  // async updatePost(id: string, input: UpdatePostInput): Promise<User> {
  //   try {
  //     await this.repo.update(id, input);
  //     return this.repo.findOneBy({ _id: id });
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }

  // async removeUser(id: string): Promise<IMessage> {
  //   try {
  //     await this.repo.delete({ _id: id });
  //     return {
  //       message: 'Success',
  //     };
  //   } catch (err) {
  //     throw new Error(err);
  //   }
  // }

  // public async findOneByEmail(email: string) {
  //   return {};
  // }
}

export default UserRepo;
