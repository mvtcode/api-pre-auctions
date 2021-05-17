import * as dotenv from 'dotenv';
dotenv.config()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // config Swagger
  const options = new DocumentBuilder()
    .setTitle("Docs API")
    .setDescription("The APIs Auctions")
    .setVersion("1.0.0")
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("/docs", app, document);

  await app.listen(process.env.SERVER_PORT, process.env.SERVER_HOST, () => {
    console.log(`API is running on ${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`);
  });
}

bootstrap();
