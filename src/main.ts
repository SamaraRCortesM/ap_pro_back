import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.enableCors();

  const swaggerOptions  = new DocumentBuilder()
    .setTitle('Food Menu')
    .setDescription('Documentacion del menu de comida.')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('docs', app, swaggerDoc, {
    explorer: true,
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });

  const port = process.env.PORT || 3000;

  await app.listen(port, "0.0.0.0");
}
bootstrap();
