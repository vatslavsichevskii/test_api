import { Injectable } from '@nestjs/common';
import PostRepo from './post.repo';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { IMessage } from 'src/interfaces/message.interface';
import { IFilterRes } from 'src/interfaces/filter-res.interface';
import { FilterPostsInput } from './dto/filter-post.input';
import { Like } from 'typeorm';
import { IFilterQuery } from 'src/interfaces/filter-query.interface';
import { Post } from 'src/model/post.entity';

@Injectable()
export class PostService {
  constructor(private readonly postRepo: PostRepo) {}

  public async createPost(createProductInput: CreatePostInput): Promise<Post> {
    return this.postRepo.createPost(createProductInput);
  }

  public async updatePost(
    postId: string,
    updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    return this.postRepo.updatePost(postId, updatePostInput);
  }

  public async deletePost(postId: string): Promise<IMessage> {
    return this.postRepo.removePost(postId);
  }

  public async getById(id: string): Promise<Post> {
    return this.postRepo.getOne({ _id: id });
  }

  public async filter(filterData: FilterPostsInput): Promise<IFilterRes> {
    try {
      const limit: number = filterData.limit || 10;
      const page: number = filterData.page || 1;
      const title: string = filterData.title || '';
      let where: IFilterQuery['where'] = [{ title: Like('%' + title + '%') }];

      if (filterData.blogId) where.push({ blogId: filterData.blogId });

      let query = {
        where,
        take: limit,
        skip: (page - 1) * limit,
      };

      const { result, total } = await this.postRepo.filter(query);

      return {
        items: result,
        currentPage: page,
        totalItems: total,
        totalPages: parseInt(`${total / limit}`),
      };
    } catch (err) {
      throw err;
    }
  }
}
