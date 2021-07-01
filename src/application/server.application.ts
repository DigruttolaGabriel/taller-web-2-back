import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { ConfigService } from '@nestjs/config';
import { json } from 'express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';

export class ServerApplication {
  public async run(): Promise<void> {
    const app: NestExpressApplication =
      await NestFactory.create<NestExpressApplication>(AppModule);
    const configService: ConfigService = app.get(ConfigService);
    const port: string = configService.get<string>('PORT');
    const host: string = configService.get<string>('HOST');
    app.use(json({ limit: '5mb' }));

    this.buildAPIDocumentation(app);

    await app.listen(port, host);
  }

  private buildAPIDocumentation = (app: NestExpressApplication): void => {
    const title: string = 'Taller Web 2';
    const description: string = 'Taller Web 2 API Documentation';
    const version: string = '1.0.0';

    const options: Omit<OpenAPIObject, 'paths'> = new DocumentBuilder()
      .setTitle(title)
      .setDescription(description)
      .setVersion(version)
      .addBearerAuth()
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);

    SwaggerModule.setup('taller-web-2/api/documentation', app, document);
  };
}
