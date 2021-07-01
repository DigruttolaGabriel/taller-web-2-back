import { ServerApplication } from './application/server.application';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './application/modules/app.module';

async function bootstrap(): Promise<void> {
  const app: ServerApplication = new ServerApplication();
  await app.run();
  //const app: NestExpressApplication =
  //await NestFactory.create<NestExpressApplication>(AppModule);
  //await app.listen(3000);
}

bootstrap();
