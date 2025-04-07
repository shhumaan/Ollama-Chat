import { Controller, Post, Body, Get, HttpException, HttpStatus } from '@nestjs/common';
import { OllamaService } from './ollama.service';
import { ChatRequestDto } from './dto/chat-request.dto';

@Controller('chat')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Post()
  async chat(@Body() chatRequest: ChatRequestDto) {
    return this.ollamaService.generateResponse(chatRequest);
  }
  
  @Get('models')
  async getModels() {
    return this.ollamaService.getModels();
  }
}

@Controller('health')
export class HealthController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Get()
  async checkHealth() {
    const isOllamaReachable = await this.ollamaService.pingOllama();
    if (isOllamaReachable) {
      return { status: 'ok', ollama: 'connected' };
    } else {
      throw new HttpException(
        { status: 'error', ollama: 'disconnected' }, 
        HttpStatus.SERVICE_UNAVAILABLE
      );
    }
  }
} 