import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './components/user/user.module';
import { ConfigService } from './services/config/config.services';
import { AuthModule } from './components/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogModule } from './components/blog/blog.module';
import { PostModule } from './components/post/post.module';
import { JwtModule } from '@nestjs/jwt';
const config = new ConfigService();
const { errorType } = require('./constant');

const MODULES = [BlogModule];
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.get('POSTGRES_HOST'),
      port: parseInt(config.get('POSTGRES_PORT')),
      username: config.get('POSTGRES_USER'),
      password: config.get('POSTGRES_PASSWORD'),
      database: config.get('POSTGRES_DATABASE'),
      entities: [__dirname + '/model/*.entity{.ts,.js}'],
      synchronize: true, // DEV only, do not use on PROD!
      logging: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      typePaths: ['src/components/**/*.graphql'],
      sortSchema: true,
      context: ({ req }) => ({ req }),
      formatError: (error: any) => {
        return errorType[error.message] || error;
      },
    }),
    JwtModule.register({
      global: true,
      secret: config.get('JWT_SECRET_KEY'),
      signOptions: { expiresIn: '3600s' },
    }),
    ...MODULES,
  ],
  controllers: [],
  providers: [ConfigService],
  exports: [...MODULES],
})
export class AppModule {}
