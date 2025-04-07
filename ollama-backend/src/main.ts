import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for the frontend
  app.enableCors({
    origin: 'http://localhost:3000', // Next.js default port
    methods: ['GET', 'POST'],
    credentials: true,
  });
  
  // Global prefix for all routes
  app.setGlobalPrefix('api');
  
  await app.listen(4000);
  console.log(`Application is running on: http://localhost:4000`);
}
bootstrap();
