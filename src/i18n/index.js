import en from './en.js'
import ta from './ta.js'
import hi from './hi.js'
import te from './te.js'
import kn from './kn.js'
import ml from './ml.js'

export const translations = { en, ta, hi, te, kn, ml }

export const languageList = Object.values(translations).map((t) => t.meta)

export const defaultLanguage = 'en'
