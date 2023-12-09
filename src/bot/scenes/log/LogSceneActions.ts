import { Ctx, Hears, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { SessionContext } from '../../config/SessionContext';
import { mainKeyboard } from './Keyboard';
import { deunionize } from 'telegraf';
import { languages } from '../../../../languages';
import { hi } from 'date-fns/locale';
import { format } from 'date-fns';

@Scene('log')
export class LogSceneActions {
  constructor() {}
  @SceneEnter()
  async enter(@Ctx() ctx: SessionContext) {
    await ctx.reply(languages[ctx.session.lang].main_menu, {
      reply_markup: mainKeyboard(ctx.session.lang),
    });
  }

  @On('text')
  async action(@Ctx() ctx: SessionContext) {
    const text = deunionize(ctx.message).text;

    if (text === languages[ctx.session.lang].buttons.smoked) {
      return this.smkoked(ctx);
    }

    if (text === languages[ctx.session.lang].buttons.history) {
      return this.history(ctx);
    }

    await ctx.reply('wtf');
  }

  async smkoked(ctx: SessionContext) {
    const history = ctx.session.log || [];
    history.push({
      date: format(new Date(), 'dd.MM.yyyy HH:mm:ss'),
      count: 1,
    });
    ctx.session.log = history;
    await this.enter(ctx);
  }

  async history(ctx: SessionContext) {
    const history = ctx.session.log;
    let message = '';
    for (const historyElement of history) {
      message += `${historyElement.date} \n`;
    }
    await ctx.reply(message);
    await this.enter(ctx);
  }
}
