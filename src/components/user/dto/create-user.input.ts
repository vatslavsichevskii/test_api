import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsEmail()
  @Field({ nullable: false, description: 'email for user', name: 'email' })
  email: string;

  @Field({
    nullable: false,
    description: 'password for user',
    name: 'password',
  })
  password: string;

  @Field({
    nullable: false,
    description: 'name for user',
    name: 'name',
  })
  name: string;

  @Field({
    nullable: false,
    description: 'role for user',
    name: 'role',
  })
  role: string;
}
