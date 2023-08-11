import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { IMessage } from 'src/interfaces/message.interface';
import { IFilterQuery } from 'src/interfaces/filter-query.interface';
import { Post } from 'src/model/post.entity';

@Injectable()
class PostRepo {
  constructor(
    @InjectRepository(Post) private readonly repo: Repository<Post>,
  ) {}

  public async createPost(input: CreatePostInput) {
    try {
      const post = await this.repo.save(input);
      return post;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async updatePost(id: string, input: UpdatePostInput): Promise<Post> {
    try {
      await this.repo.update(id, input);
      return this.repo.findOneBy({ _id: id });
    } catch (err) {
      throw new Error(err);
    }
  }

  public async removePost(id: string): Promise<IMessage> {
    try {
      await this.repo.delete({ _id: id });
      return {
        message: 'Success',
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getOne(query: { [key: string]: string }): Promise<Post> {
    try {
      return this.repo.findOne(query);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async filter(
    query: IFilterQuery,
  ): Promise<{ result: Post[]; total: number }> {
    try {
      const [result, total] = await this.repo.findAndCount(query);
      return {
        result,
        total
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default PostRepo;
