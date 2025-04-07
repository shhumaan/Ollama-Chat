import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OllamaController, HealthController } from './ollama.controller';
import { OllamaService } from './ollama.service';

@Module({
  imports: [HttpModule],
  controllers: [OllamaController, HealthController],
  providers: [OllamaService],
})
export class OllamaModule {} 