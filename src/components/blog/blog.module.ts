import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { JwtModule } from '@nestjs/jwt';
import BlogRepo from './blog.repo';
import { ConfigService } from 'src/services/config/config.services';
const config = new ConfigService();

@Module({
  imports: [],
  providers: [BlogResolver, BlogService, BlogRepo],
})
export class BlogModule {}
