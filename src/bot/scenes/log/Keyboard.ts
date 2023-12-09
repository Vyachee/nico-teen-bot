import { ReplyKeyboardMarkup } from 'typegram/markup';
import { languages } from '../../../../languages';

export function mainKeyboard(lang): ReplyKeyboardMarkup {
  return {
    keyboard: [
      [languages[lang].buttons.smoked],
      [languages[lang].buttons.history],
    ],
  };
}
