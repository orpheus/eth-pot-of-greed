import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const defaultOptions = {
  debug: true, // TODO: enable-disable correctly
  fallbackLng: 'en',
  load: 'languageOnly',
  returnObjects: true,
  backend: {
    loadPath: '/public/locales/{{lng}}/{{ns}}.json'
  }
}

export default (options = defaultOptions) => {
  if (options) {
    options = { ...defaultOptions, ...options }
  }
  i18n
    .use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init(options)
}
