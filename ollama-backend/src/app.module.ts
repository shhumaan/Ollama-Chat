import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OllamaModule } from './ollama/ollama.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    OllamaModule,
  ],
})
export class AppModule {}
