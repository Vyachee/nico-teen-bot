import { Ctx, Hears, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { SessionContext } from '../../config/SessionContext';
import { mainKeyboard } from './Keyboard';
import { deunionize } from 'telegraf';
import { languages } from '../../../languages';
import { hi } from 'date-fns/locale';
import {
  differenceInHours,
  differenceInMinutes,
  format,
  parse,
} from 'date-fns';

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
    const lastUsed = history?.at(-1);
    history.push({
      date: format(new Date(), 'dd.MM.yyyy HH:mm:ss'),
      count: 1,
    });
    ctx.session.log = history;

    if (lastUsed) {
      const lastUsedDate = parse(
        lastUsed.date,
        'dd.MM.yyyy HH:mm:ss',
        new Date(),
      );
      const differenceMinutes = differenceInMinutes(new Date(), lastUsedDate);
      const differenceHours = differenceInHours(new Date(), lastUsedDate);
      await ctx.reply(
        `С последнего раза прошло ${differenceMinutes} минут (${differenceHours} часов)`,
      );
    }
    await this.enter(ctx);
  }

  async history(ctx: SessionContext) {
    const history = ctx.session.log;
    const groupped = {};
    for (const historyElement of history) {
      const key = historyElement.date.split(' ')[0];
      groupped[key] = [...(groupped[key] || []), historyElement];
    }
    let message = '';

    for (const key of Object.keys(groupped)) {
      const items = groupped[key];
      message += `${key} - ${items.length} раз:\n`;

      for (const item of items) {
        message += `\t${item.date.split(' ')[1]}\n`;
      }
    }

    await ctx.reply(message);
    await this.enter(ctx);
  }
}
