import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from './services/config/config.services';
import { ValidationPipe } from '@nestjs/common';
var cors = require('cors');

async function bootstrap() {
  const config = new ConfigService();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({}));
  const port = config.get('PORT');
  const host = config.get('HOST');
  app.use(cors());

  await app.listen(port, host, () => {
    console.log(`Server is running http://${host}:${port}/`);
  });
}
bootstrap();
