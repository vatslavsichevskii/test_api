import { User } from 'src/model/user.entity';

export interface ILoginRes {
  accessToken: string;
  user: User;
}
