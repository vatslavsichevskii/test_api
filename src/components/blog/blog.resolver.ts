import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { Blog } from 'src/model/blog.entity';
import { IMessage } from 'src/interfaces/message.interface';
import { IFilterRes } from 'src/interfaces/filter-res.interface';
import { FilterBlogsInput } from './dto/filter-blog.input';
import { UseGuards } from '@nestjs/common';
import { WriterGuard } from 'src/guard/writer.guard';

@Resolver('Blog')
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(WriterGuard)
  @Mutation('createBlog')
  async createBlog(@Args('input') input: CreateBlogInput): Promise<Blog> {
    try {
      return this.blogService.createBlog(input);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(WriterGuard)
  @Mutation('updateBlog')
  async updateBlog(
    @Args('id') id: string,
    @Args('input') input: UpdateBlogInput,
  ): Promise<Blog> {
    try {
      return this.blogService.updateBlog(id, input);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(WriterGuard)
  @Mutation('deleteBlog')
  async deleteBlog(@Args('id') id: string): Promise<IMessage> {
    try {
      return this.blogService.deleteBlog(id);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(WriterGuard)
  @Query('getBlogById')
  async getById(@Args('id') id: string): Promise<Blog> {
    try {
      return this.blogService.getById(id);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(WriterGuard)
  @Query('filterBlogs')
  async filterBlogs(
    @Args('input') input: FilterBlogsInput,
  ): Promise<IFilterRes> {
    try {
      return this.blogService.filter(input);
    } catch (err) {
      throw err;
    }
  }
}
