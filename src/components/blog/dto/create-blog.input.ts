import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBlogInput {
  @Field({
    description: 'blog title',
    name: 'title',
    nullable: false,
  })
  title: string;

  @Field({
    description: 'blog text',
    name: 'text',
    nullable: false,
  })
  text: string;

  @Field({
    description: 'author id',
    name: 'authorId',
    nullable: false,
  })
  authorId: string;
}
