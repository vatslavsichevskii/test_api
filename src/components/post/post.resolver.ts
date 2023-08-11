import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from 'src/model/post.entity';
import { IMessage } from 'src/interfaces/message.interface';
import { IFilterRes } from 'src/interfaces/filter-res.interface';
import { FilterPostsInput } from './dto/filter-post.input';
import { UseGuards } from '@nestjs/common';
import { WriterGuard } from 'src/guard/writer.guard';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @UseGuards(WriterGuard)
  @Mutation('createPost')
  async createPost(@Args('input') input: CreatePostInput): Promise<Post> {
    try {
      return this.postService.createPost(input);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(WriterGuard)
  @Mutation('updatePost')
  async updatePost(
    @Args('id') id: string,
    @Args('input') input: UpdatePostInput,
  ): Promise<Post> {
    try {
      return this.postService.updatePost(id, input);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(WriterGuard)
  @Mutation('deletePost')
  async deletePost(@Args('id') id: string): Promise<IMessage> {
    try {
      return this.postService.deletePost(id);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(WriterGuard)
  @Query('getPostById')
  async getById(@Args('id') id: string): Promise<Post> {
    try {
      return this.postService.getById(id);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(WriterGuard)
  @Query('filterPosts')
  async filterPosts(
    @Args('input') input: FilterPostsInput,
  ): Promise<IFilterRes> {
    try {
      return this.postService.filter(input);
    } catch (err) {
      throw err;
    }
  }
}
