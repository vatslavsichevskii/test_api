import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Blog } from './blog.entity';
import { Field } from '@nestjs/graphql';

@Entity({ name: 'post' })
export class Post extends BaseEntity {
  @Field((type) => String)
  @Column({ type: 'varchar', length: 300 })
  title: string;

  @Field((type) => String)
  @Column({ type: 'varchar' })
  text: string;

  @Field((type) => Blog)
  @ManyToOne(() => Blog, (blog: Blog) => blog.posts)
  blog: Blog;
}
