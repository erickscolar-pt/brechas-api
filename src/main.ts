/* import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {




}
bootstrap();
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  const date = new Date;
  const currentTime = date.toLocaleTimeString('pt-BR', { hour12: false });

  app.enableCors();

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API para gerenciar Brechas e Mariners')
    .setDescription('Endpoints para gerenciar brechas e criar mariners, incluindo suas vitórias e empates')
    .setVersion('1.0')
    .addTag('brechas') // Adiciona a tag de "brechas"
    .addTag('mariners') // Adiciona a tag de "mariners"
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // A API estará acessível em /api

  await app.listen(port);
  console.log('port: ' + port)
  console.log('connected ' + currentTime)
}
bootstrap();
