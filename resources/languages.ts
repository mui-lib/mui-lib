//

// The code of UN languages.
// @see https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes
// @see https://www.un.org/en/sections/about-un/official-languages/
// Arabic, Chinese, English, French, Russian and Spanish
export const UN_LANGUAGES = {
	ar: 'ar',
	en: 'en',
	es: 'es',
	fr: 'fr',
	ru: 'ru',
	zh: 'zh',
	Arabic: 'Arabic',
	Chinese: 'Chinese',
	English: 'English',
	French: 'French',
	Russian: 'Russian',
	Spanish: 'Spanish',
	'العربية': 'العربية',
	'中文': '中文',
	'ENGLISH': 'English',
	'Français': 'Français',
	'Русский': 'Русский',
	'Español': 'Español',
};

export interface IUnLanguages<T = string> {
	ar?: T;
	zh?: T;
	en?: T;
	fr?: T;
	ru?: T;
	es?: T;
}

// The bundle of default language and un languages.
export interface ILanguagesBundle<T> extends IUnLanguages<T> {
	df: T;
}

export type I18N<T = string> = ILanguagesBundle<T>;
