import i18n from '@localization';

export const defineLocalizedProperties = (target: object, propertyKeys: PropertyKey[], locales: string[]): void => {
	if (propertyKeys === null || locales === null) {
		return;
	}

	for (const key of propertyKeys) {
		for (const locale of locales) {
			// concatenate Key + Locale
			Reflect.defineProperty(target, String(key) + locale, { enumerable: true, writable: true });
		}
	}
};

export abstract class WithTranslation {
	constructor(...localizedProps: string[]) {
		defineLocalizedProperties(this, localizedProps!, Object.keys(i18n.translations));
	}
}
