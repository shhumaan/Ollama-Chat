import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { ChatRequestDto } from './dto/chat-request.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OllamaService {
  private ollamaUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.ollamaUrl = this.configService.get<string>('OLLAMA_API_URL', 'http://localhost:11434');
  }

  async generateResponse(chatRequest: ChatRequestDto) {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.ollamaUrl}/api/generate`, {
          model: chatRequest.modelId,
          prompt: chatRequest.prompt,
          stream: false,
        })
      );
      return {
        text: response.data.response,
        model: chatRequest.modelId,
      };
    } catch (error) {
      console.error('Ollama API error (generateResponse):', error.response?.data || error.message);
      throw new HttpException(
        `Failed to communicate with Ollama API: ${error.response?.data?.error || error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  async getModels() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.ollamaUrl}/api/tags`)
      );
      // Transform Ollama response { models: [{ name: "model:tag", ... }] } 
      // to the format expected by frontend { id: "model:tag", name: "model:tag" }
      return response.data.models.map((model: any) => ({ 
        id: model.name, 
        name: model.name 
      }));
    } catch (error) {
      console.error('Ollama API error (getModels):', error.response?.data || error.message);
      throw new HttpException(
        'Failed to fetch models from Ollama API',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async pingOllama(): Promise<boolean> {
    try {
      await firstValueFrom(this.httpService.get(`${this.ollamaUrl}/api/tags`));
      return true;
    } catch (error) {
      console.error('Ollama API error (pingOllama):', error.message);
      return false; // Return false instead of throwing error
    }
  }
} 