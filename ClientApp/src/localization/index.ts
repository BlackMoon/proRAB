import { locale } from 'expo-localization';

import i18n from 'i18n-js';
import { en } from './en';
import { ru } from './ru';

console.debug(locale);

i18n.fallbacks = true;
i18n.locale = 'ru'; // locale;
i18n.translations = { en, ru };

export { i18n, locale };
