import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{
    logger: process.env.NODE_ENV === 'production' ? ['warn', 'error'] : ['log', 'verbose','debug']
  });
  app.use(helmet());
  await app.listen(3000);
}
bootstrap();
