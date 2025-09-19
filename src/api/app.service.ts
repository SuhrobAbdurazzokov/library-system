import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { config } from 'src/config';
import { AllExceptionFilter } from 'src/infrastructure/exception/all.filter.exception';

export class Application {
  static async start() {
    const PORT = config.API_PORT;
    const app = await NestFactory.create(AppModule);

    const globalPrefix = 'api/v1';
    app.setGlobalPrefix(globalPrefix);

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      }),
    );

    app.useGlobalFilters(new AllExceptionFilter());

    const swaggerConfig = new DocumentBuilder()
      .setTitle('Library')
      .setDescription('t.me/@suhrobswe')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup(globalPrefix, app, document);

    await app.listen(PORT, () => console.log(`Server running on port:`, PORT));
  }
}
