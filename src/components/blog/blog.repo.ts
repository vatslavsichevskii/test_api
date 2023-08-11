import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from 'src/model/blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { IMessage } from 'src/interfaces/message.interface';
import { IFilterQuery } from 'src/interfaces/filter-query.interface';

@Injectable()
class BlogRepo {
  constructor() // @InjectRepository(Blog) private readonly repo: Repository<Blog>,
  {}

  public async createBlog(blogInput: CreateBlogInput) {
    console.log('createBlog => ', blogInput);
    try {
      return {
        _id: '1',
        title: 'title',
        text: 'text',
        authorId: '1',
        createDateTime: new Date(),
        lastChangedDateTime: new Date(),
      } as Blog;
      // const blog = await this.repo.save(blogInput);
      // return blog;
    } catch (err) {
      throw new Error(err);
    }
  }

  public async updateBlog(
    blogId: string,
    blogInput: UpdateBlogInput,
  ): Promise<Blog> {
    try {
      console.log('updateBlog => ', blogId, blogInput);
      return {
        _id: '1',
        title: 'title',
        text: 'text',
        authorId: '1',
        createDateTime: new Date(),
        lastChangedDateTime: new Date(),
      } as Blog;
      // await this.repo.update(blogId, blogInput);
      // return this.repo.findOneBy({ _id: blogId });
    } catch (err) {
      throw new Error(err);
    }
  }

  public async removeBlog(blogId: string): Promise<IMessage> {
    try {
      console.log('updateBlog => ', blogId);
      // await this.repo.delete({ _id: blogId });
      return {
        message: 'Success',
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  public async getOne(query: { [key: string]: string }): Promise<Blog> {
    try {
      console.log('getOne => ', query);
      return {
        _id: '1',
        title: 'title',
        text: 'text',
        authorId: '1',
        createDateTime: new Date(),
        lastChangedDateTime: new Date(),
      } as Blog;
      // return this.repo.findOne(query);
    } catch (err) {
      throw new Error(err);
    }
  }

  public async filter(
    query: IFilterQuery,
  ): Promise<{ result: Blog[]; total: number }> {
    try {
      console.log('filter => ', query);
      // const [result, total] = await this.repo.findAndCount(query);
      return {
        result: [
          {
            _id: '1',
            title: 'title',
            text: 'text',
            authorId: '1',
            createDateTime: new Date(),
            lastChangedDateTime: new Date(),
          } as Blog,
        ],
        total: 1,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default BlogRepo;
