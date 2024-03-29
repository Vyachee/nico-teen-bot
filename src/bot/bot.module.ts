import { Module } from '@nestjs/common';
import { BotUpdate } from './bot.update';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegrafConfigService } from './config/TelegrafConfigService';
import { OnboardingSceneActions } from './scenes/onboarding/OnboardingSceneActions';
import { FirstTrySceneActions } from './scenes/first-try/FirstTrySceneActions';
import { LogSceneActions } from './scenes/log/LogSceneActions';

@Module({
  controllers: [],
  providers: [
    BotUpdate,
    OnboardingSceneActions,
    FirstTrySceneActions,
    LogSceneActions,
  ],
  imports: [
    TelegrafModule.forRootAsync({
      imports: [],
      useClass: TelegrafConfigService,
      inject: [],
    }),
  ],
  exports: [],
})
export class BotModule {}
