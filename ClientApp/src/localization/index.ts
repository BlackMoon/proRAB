import { locale } from 'expo-localization'; // or whatever library you want
import i18n from 'i18n-js'; // or whatever library you want
import { en } from './en';
import { ru } from './ru';

console.debug(locale);

i18n.fallbacks = true;
i18n.locale = 'ru'; // locale;
i18n.translations = { en, ru };

export default i18n;
