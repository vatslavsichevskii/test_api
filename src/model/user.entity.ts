import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Blog } from './blog.entity';
import { Field } from '@nestjs/graphql';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Field((type) => String)
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Field((type) => String)
  @Column({ type: 'varchar', length: 300 })
  email: string;

  @Field((type) => String)
  @Column({ type: 'varchar', length: 300 })
  passwordHash: string;

  @Field((type) => String)
  @Column({ type: 'varchar', default: 'writer' })
  role: 'writer' | 'moderator';

  @Field((type) => [Blog])
  @OneToMany(() => Blog, (blog: Blog) => blog.author)
  blogs?: Blog[];
}
