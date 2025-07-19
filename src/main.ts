import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './config/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  // Helmet settings
  // app.use(helmet());

  // GlobalPipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // Env settings
  const appConfig = app.get(ConfigService);

  // Config for Prisma
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // Config for Swagger
  if (appConfig.get('app.env') === 'development') {
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Love2Heart API')
      .setDescription('The API description for Love2Heart')
      .build();
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);
  }

  const port = appConfig.get('app.port') || 8000;
  await app.listen(port);
  console.info(`=> Application running in ${appConfig.get('app.env')} mode`);
  console.info(`=> Server listening at http://localhost:${port}`);
}
bootstrap();
