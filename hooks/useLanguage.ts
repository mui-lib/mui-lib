import React from 'react';
import {ILanguagesBundle, UN_LANGUAGES} from '../resources/languages';

interface IContextLanguageValue {
	language: string;
	languages: readonly string[];
}

export const DEFAULT_LANGUAGE_CONTEXT_VALUE: IContextLanguageValue = {
	language: navigator.language || UN_LANGUAGES.en,
	languages: navigator.languages,
};

// @see https://reactjs.org/docs/hooks-reference.html#usecontext
const ContextLanguage = React.createContext(DEFAULT_LANGUAGE_CONTEXT_VALUE);
export const ContextLanguageProvider = ContextLanguage.Provider;

// Call hooks in functional components.
export const useLanguageContext = (): IContextLanguageValue => React.useContext(ContextLanguage);
// Get the preferred language from context.
export const usePreferredLanguageFromContext = (): string => React.useContext(ContextLanguage).language;
// Get the localized resources( of strings) by the preferred language from context.
export const useLocalizedResourcesFromContext = <T>(bundle: ILanguagesBundle<T>): T => bundle[usePreferredLanguageFromContext()] || bundle.df;
export const useLocalizedResourceFromContext = <T>(bundle: Partial<ILanguagesBundle<T>>): T => bundle[usePreferredLanguageFromContext()] || bundle.df;
