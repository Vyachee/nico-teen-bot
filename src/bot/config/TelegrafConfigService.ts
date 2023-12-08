import { TelegrafOptionsFactory } from 'nestjs-telegraf';
import { TelegrafModuleOptions } from 'nestjs-telegraf/dist/interfaces/telegraf-options.interface';
import { ConfigService } from '@nestjs/config';
import { session } from 'telegraf';
import { Redis } from '@telegraf/session/redis';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegrafConfigService implements TelegrafOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  async createTelegrafOptions(): Promise<TelegrafModuleOptions> {
    const [host, port, password] = [
      this.configService.get<string>('REDIS_HOST'),
      this.configService.get<number>('REDIS_PORT') || 6379,
      this.configService.get<string>('REDIS_PASSWORD'),
    ];

    const url = `redis://:${password}@${host}:${port}`;
    const store = Redis<object>({
      url,
    });

    return {
      token: this.configService.getOrThrow('TELEGRAM_BOT_TOKEN'),
      middlewares: [session({ store })],
    };
  }
}
