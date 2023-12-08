import { Ctx, On, Scene, SceneEnter } from 'nestjs-telegraf';
import { SessionContext } from '../../config/SessionContext';
import { languages } from '../../../../languages';
import { deunionize } from 'telegraf';

@Scene('first-try')
export class FirstTrySceneActions {
  constructor() {}
  @SceneEnter()
  async enter(@Ctx() ctx: SessionContext) {
    await ctx.reply(languages[ctx.session.lang].enter_first_year);
  }

  @On('text')
  async action(@Ctx() ctx: SessionContext) {
    const year = deunionize(ctx.message).text;
    if (year.length !== 4 || !Number(year)) {
      return await this.enter(ctx);
    }

    ctx.session.firstLoggedDate = new Date(`${year}-01-01`);

    await ctx.reply('test');
    // await ctx.scene.enter('bs-search');
  }
}
