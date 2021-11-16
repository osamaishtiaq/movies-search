import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_KEYS } from '@shared/common/constants';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.setGlobalPrefix('api', { exclude: ['/', 'portal'] });

  app.useGlobalPipes(new ValidationPipe());
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Movies API Example')
    .setDescription('Movies API description')
    .setVersion('1.0')
    .build();

  app.use(helmet());

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const configService: ConfigService = new ConfigService();
  const port = configService.get<string>(ENV_KEYS.APP_PORT);
  Logger.log(`Application running at port: ${port || 8080}`);
  await app.listen(port || 8080);
}
bootstrap();
