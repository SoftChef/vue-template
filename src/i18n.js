import Vue from 'vue'
import VueI18n from 'vue-i18n'

import enUs from './locales/en-us'
import zhTw from './locales/zh-tw'
import zhCn from './locales/zh-cn'

class I18n {
    constructor() {
        this.locale = 'en-us'
        this.userLocale = 'en-us'
        this.defaultLocale = 'en-us'
        this.messages = {}
        this.vueI18n = null
        this.numberFormats = {
            'en-us': {
                currency: {
                    style: 'currency',
                    currency: 'USD'
                }
            },
            'zh-tw': {
                currency: {
                    style: 'currency',
                    currency: 'USD'
                }
            },
            'zh-cn': {
                currency: {
                    style: 'currency',
                    currency: 'USD'
                }
            }
        }
    }
    addLocale(locale, messages, moduleName = null) {
        if (this.messages.hasOwnProperty(locale)) {
            if (moduleName) {
                this.messages[locale][moduleName] = messages
            } else {
                this.messages[locale] = {
                    ...this.messages[locale],
                    ...messages
                }
            }
        } else {
            this.messages[locale] = messages
        }
    }
    setUserLocale(locale) {
        this.userLocale = locale
    }
    getInstance() {
        if (this.vueI18n) {
            return this.vueI18n
        }
        const currentLocale = this.userLocale || localStorage.getItem('locale')
        if (!this.messages.hasOwnProperty(currentLocale)) {
            let languages = []
            if (navigator.languages !== undefined) {
                languages = navigator.languages
            } else {
                languages.push(navigator.language)
            }
            for (let i in languages) {
                let language = languages[i].toLowerCase()
                if (this.messages.hasOwnProperty(language)) {
                    this.locale = language
                    break
                }
            }
        } else {
            this.locale = currentLocale.toLowerCase()
        }
        this.vueI18n = new VueI18n({
            locale: this.locale,
            fallbackLocale: this.defaultLocale,
            messages: this.messages,
            silentTranslationWarn: true,
            numberFormats: this.numberFormats
        })
        return this.vueI18n
    }
}

const i18n = new I18n()
i18n.addLocale('en-us', enUs)
i18n.addLocale('zh-tw', zhTw)
i18n.addLocale('zh-cn', zhCn)

Vue.use(VueI18n)

export default i18n
