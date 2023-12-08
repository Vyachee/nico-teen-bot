import { InlineKeyboardMarkup } from 'typegram/markup';
export const languageKeyboard: InlineKeyboardMarkup = {
  inline_keyboard: [
    [{ text: 'Русский', callback_data: 'lang_ru' }],
    [{ text: 'English', callback_data: 'lang_en' }],
  ],
};
