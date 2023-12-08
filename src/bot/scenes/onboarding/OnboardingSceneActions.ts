import { Action, Ctx, Scene, SceneEnter } from 'nestjs-telegraf';
import { SessionContext } from '../../config/SessionContext';
import { languageKeyboard } from './Keyboard';
import { deunionize } from 'telegraf';
import { languages } from '../../../../languages';

@Scene('onboarding')
export class OnboardingSceneActions {
  @SceneEnter()
  async enter(@Ctx() ctx: SessionContext) {
    await ctx.reply('Hello! Select language:', {
      reply_markup: languageKeyboard,
    });
  }

  @Action(/lang_.*/g)
  async langSelected(@Ctx() ctx: SessionContext) {
    await ctx.answerCbQuery();
    const action = deunionize(deunionize(ctx.update).callback_query).data;
    const lang = action.replaceAll('lang_', '');
    ctx.session.lang = lang;

    await ctx.editMessageText(
      `${languages[lang].you_selected} ${languages[lang].label}`,
    );
    await ctx.scene.enter('first-try');
  }
}
