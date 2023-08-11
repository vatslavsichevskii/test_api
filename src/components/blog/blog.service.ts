import { Injectable } from '@nestjs/common';
import BlogRepo from './blog.repo';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from 'src/model/blog.entity';
import { IMessage } from 'src/interfaces/message.interface';
import { IFilterRes } from 'src/interfaces/filter-res.interface';
import { FilterBlogsInput } from './dto/filter-blog.input';
import { Like } from 'typeorm';
import { IFilterQuery } from 'src/interfaces/filter-query.interface';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepo: BlogRepo) {}

  public async createBlog(createProductInput: CreateBlogInput): Promise<Blog> {
    return this.blogRepo.createBlog(createProductInput);
  }

  public async updateBlog(
    blogId: string,
    updateBlogInput: UpdateBlogInput,
  ): Promise<Blog> {
    return this.blogRepo.updateBlog(blogId, updateBlogInput);
  }

  public async deleteBlog(blogId: string): Promise<IMessage> {
    return this.blogRepo.removeBlog(blogId);
  }

  public async getById(id: string): Promise<Blog> {
    return this.blogRepo.getOne({ _id: id });
  }

  public async filter(filterData: FilterBlogsInput): Promise<IFilterRes> {
    try {
      const limit: number = filterData.limit || 10;
      const page: number = filterData.page || 1;
      const title: string = filterData.title || '';
      let where: IFilterQuery['where'] = [{ title: Like('%' + title + '%') }];

      if (filterData.authorId) where.push({ authorId: filterData.authorId });

      let query = {
        where,
        take: limit,
        skip: (page - 1) * limit,
      };

      const { result, total } = await this.blogRepo.filter(query);

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
