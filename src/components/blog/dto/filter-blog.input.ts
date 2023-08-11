import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FilterBlogsInput {
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
    description: 'author id',
    name: 'authorId',
    nullable: true,
  })
  authorId?: string;

  @Field({
    description: 'blog title',
    name: 'title',
    nullable: true,
  })
  title?: string;
}
