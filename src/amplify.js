import Amplify, { Auth } from 'aws-amplify'

const $amplify = {
    config: {
        Auth: {},
        API: {
            endpoints: []
        }
    },
    install(Vue, options = {}) {
        Object.defineProperties(Vue.prototype, {
            $Amplify: {
                get(name) {
                     return Amplify
                }
            }
        })
    },
    setAuthConfig(config) {
        this.config['Auth'] = config
    },
    setMandatorySignIn(mandatory) {
        this.config['mandatorySignIn'] = mandatory
    },
    setApiConfig(config) {
        if (!Array.isArray(config)) {
            config = [
                config
            ]
        }
        for (let endpoint of config) {
            if (endpoint.authentication && typeof endpoint.custom_header !== 'function') {
                endpoint.custom_header = async() => {
                    return {
                        Authorization: (
                            await Auth.currentSession()
                        ).getIdToken().getJwtToken()
                    }
                }
            }
            this.config['API']['endpoints'].push(endpoint)
        }
    },
    setStorageConfig(config) {
        this.config['Storage'] = config
    },
    setConfig(config) {
        if (config['API']) {
            this.setApiConfig(config['API'].endpoints || [])
        }
    },
    apply() {
        Amplify.configure(this.config)
    }
}

export {
    $amplify as default,
    Auth
}
