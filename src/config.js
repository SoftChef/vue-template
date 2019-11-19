import Vue from 'vue'

class Config {
    constructor() {
        this.config = {}
        this.fetch()
    }
    async fetch() {
        try {
            if (process.env.NODE_ENV === 'production') {
                this.config = {
                    region: 'ap-northeast-1',
                    bucketName: 'giant-uat.softchef.com',
                    userPoolId: 'ap-northeast-1_m0TfYvsZi',
                    userPoolWebClientId: '3d7em3phsuevcpo7ef9rpq30rh',
                    userIdentityPoolId: 'ap-northeast-1:fa9092ca-eafe-43e1-9550-d637f5abcb96',
                    rideControlApiId: '3ety2gh2zd',
                    firmwareApiId: 'thajth2f1g'
                }
            } else {
                this.config = {
                    region: 'ap-northeast-1',
                    bucketName: 'giant-dev.softchef.com',
                    userPoolId: 'ap-northeast-1_NjTCxDODm',
                    userPoolWebClientId: '2v60bbf2371kcpq7qfk13ce5oo',
                    userIdentityPoolId: 'ap-northeast-1:36931040-1c72-46c8-a7d4-bcc9dcad2c30',
                    rideControlApiId: 'ajru1ma72a',
                    firmwareApiId: 'poimq737m5'
                }
            }
        } catch (error) {
            console.log('Fetch config error', error)
        }
    }
    get(name, defaultValue = null) {
        return this.config[name] || defaultValue
    }
    export() {
        return this.config
    }
}

const config = new Config()

Vue.use({
    install(Vue, options = {}) {
        Object.defineProperties(Vue.prototype, {
            $config: {
                get() {
                    return config
                }
            }
        })
    }
})

export default config.export()
