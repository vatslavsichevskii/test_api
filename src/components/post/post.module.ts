import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { JwtModule } from '@nestjs/jwt';
import PostRepo from './post.repo';
import { ConfigService } from 'src/services/config/config.services';
const config = new ConfigService();

@Module({
  imports: [],
  providers: [PostResolver, PostService, PostRepo],
})
export class PostModule {}
