import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as config from 'config';
async function bootstrap() {
  const serverConfig = config.get('server');
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const port = serverConfig.port;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  logger.log(`App runnig on port ${port}`)
}
bootstrap();
