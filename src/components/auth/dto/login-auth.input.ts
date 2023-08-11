import { Field, InputType } from '@nestjs/graphql';

import { IsEmail } from 'class-validator';

@InputType()
export class LoginInput {
  @IsEmail()
  @Field({ nullable: false, description: 'email for login', name: 'email' })
  email: string;

  @Field({
    nullable: false,
    description: 'password for login',
    name: 'password',
  })
  password: string;
}
