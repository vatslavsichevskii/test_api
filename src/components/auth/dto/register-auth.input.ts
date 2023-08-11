import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class RegisterInput {
  @IsEmail()
  @Field({ nullable: false, description: 'email for register', name: 'email' })
  email: string;

  @Field({
    nullable: false,
    description: 'password for register',
    name: 'password',
  })
  password: string;

  @Field({
    nullable: false,
    description: 'name for register',
    name: 'name',
  })
  name: string;

  @Field({
    nullable: false,
    description: 'name for register',
    name: 'name',
  })
  role: string;
}
