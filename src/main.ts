import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import requestContext from './middlewares/request-context.middleware';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const port = +config.get('PORT');

  app.enableCors({
    origin: config.get('CORS_ORIGIN'),
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
    allowedHeaders: config.get('CORS_ALLOWED_HEADERS'),
    maxAge: 86400
  });

  app.use(helmet());
  app.use(requestContext());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  );

  await app.listen(port, '0.0.0.0', () => {
    Logger.log(`Server running on port ${port}`, bootstrap.name);
  });
}

bootstrap();
