import { Blog } from 'src/model/blog.entity';
import { Post } from 'src/model/post.entity';

export interface IFilterRes {
  items: Blog[] | Post[];
  currentPage: number;
  totalItems: number;
  totalPages: number;
}
