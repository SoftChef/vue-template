import '@babel/polyfill'

import Vue from 'vue'

import vuetify from './plugins/vuetify'
// import moment from './plugins/moment'
import './plugins/lodash'

import router from './router'
import stores from './stores'
import i18n from './i18n'
// import config from './config'

// import $Amplify, { Auth } from './amplify'

import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import App from './pages/App.vue'

import './components'
import './breadcrumbs'

(async() => {
    try {
        // $Amplify.setMandatorySignIn(true)
        // $Amplify.setAuthConfig({
        //     region: config.region,
        //     userPoolId: config.userPoolId,
        //     userPoolWebClientId: config.userPoolWebClientId,
        //     identityPoolId: config.userIdentityPoolId
        // })
        // $Amplify.setApiConfig([])
        // $Amplify.setStorageConfig({
        //     AWSS3: {
        //         bucket: config.bucketName,
        //         region: config.region
        //     }
        // })
        // $Amplify.apply()
    } catch (error) {
        console.log(error)
    }
    // let user, credentials
    try {
        // user = await Auth.currentAuthenticatedUser({
        //     bypassCache: false
        // })
        // credentials = await Auth.currentCredentials()
        // Set user's locale setting
        // i18n.setUserLocale(user.attributes.locale || null)
        // Set user's timezone setting
        // moment.tz.setDefault(user.attributes.zoneinfo || null)
        // Commit current user to store
        // stores.commit('Authenticates/setCurrentAuthenticatedUser', user)
        // Commit current credentials to store
        // stores.commit('Authenticates/setCurrentCredentials', credentials)
        // Connect to web socket server
    } catch (error) {
        // router.replace({
        //     name: 'authenticate.signIn'
        // })
    }
    // Vue.use($Amplify)
    // eslint-disable-next-line no-unused-vars
    const vue = new Vue({
        vuetify,
        router,
        store: stores,
        i18n: i18n.getInstance(),
        el: '#app',
        render: h => h(App)
    })
})()
