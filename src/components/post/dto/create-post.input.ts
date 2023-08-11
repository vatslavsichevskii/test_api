import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreatePostInput {
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
    description: 'blog id',
    name: 'blogId',
    nullable: false,
  })
  blogId: string;
}
