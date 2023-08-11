import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterPostsInput {
  @Field({
    description: 'page',
    name: 'page',
    nullable: false,
  })
  page: number;

  @Field({
    description: 'limit',
    name: 'limit',
    nullable: false,
  })
  limit: number;

  @Field({
    description: 'blog id',
    name: 'blogId',
    nullable: true,
  })
  blogId?: string;

  @Field({
    description: 'blog title',
    name: 'title',
    nullable: true,
  })
  title?: string;
}
