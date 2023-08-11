import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { Post } from './post.entity';
import { User } from './user.entity';
import { Field } from '@nestjs/graphql';

@Entity({ name: 'blog' })
export class Blog extends BaseEntity {
  @Field((type) => String)
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Field((type) => String)
  @Column({ type: 'varchar' })
  text: string;

  @Field((type) => [Post])
  @OneToMany(() => Post, (post: Post) => post.blog)
  posts: Post[];

  @Field((type) => User)
  @ManyToOne(() => User, (author: User) => author.blogs)
  author: User;
}
