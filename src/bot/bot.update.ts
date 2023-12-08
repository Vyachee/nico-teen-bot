import { Command, Ctx, Start, Update } from 'nestjs-telegraf';
import { SessionContext } from './config/SessionContext';

@Update()
export class BotUpdate {
  @Command('pablo')
  async pablo(@Ctx() ctx: SessionContext) {
    await ctx.reply(`chat id: ${ctx.chat.id}`);
    await ctx.scene.enter('onboarding');
  }

  @Start()
  async start(@Ctx() ctx: SessionContext) {
    // TODO можно здесь закинуть какую-нибудь логику, для самой-самой первоначальной настройки. Язык, что-то еще?

    await ctx.scene.enter('onboarding');
  }

  @Command('start')
  async onStart(@Ctx() ctx: SessionContext) {
    // TODO можно здесь закинуть какую-нибудь логику, для самой-самой первоначальной настройки. Язык, что-то еще?

    await ctx.scene.enter('onboarding');
  }
}
