import { Auth } from 'aws-amplify'

export default {
    namespaced: true,
    state: {
        user: null,
        credentials: null
    },
    actions: {
        getCurrentAuthenticatedUser({ commit }) {
            return new Promise((resolve, reject) => {
                Auth.currentAuthenticatedUser({
                    bypassCache: false
                }).then(user => {
                    resolve(user)
                }).catch(error => {
                    resolve(error)
                })
            })
        },
        signIn({ commit }, { username, password }) {
            return new Promise((resolve, reject) => {
                Auth.signIn(username, password).then(user => {
                    commit('setCurrentAuthenticatedUser', user)
                    resolve(user)
                }).catch(error => {
                    reject(error.message || error)
                })
            })
        },
        changeNewPassword({ commit }, { user, newPassword }) {
            return new Promise((resolve, reject) => {
                Auth.completeNewPassword(user, newPassword).then(user => {
                    commit('setCurrentAuthenticatedUser', user)
                    resolve(user)
                }).catch(error => {
                    reject(error.message || error)
                })
            })
        },
        changePassword({ commit }, { currentUser, oldPassword, newPassword }) {
            return new Promise((resolve, reject) => {
                Auth.changePassword(currentUser, oldPassword, newPassword)
                    .then(result => {
                        resolve(result)
                    })
                    .catch(error => {
                        resolve(error.message || error)
                    })
            })
        },
        forgotPassword({ commit }, { username }) {
            return new Promise((resolve, reject) => {
                Auth.forgotPassword(username)
                    .then(result => {
                        resolve(result)
                    }).catch(error => {
                        reject(error.message || error)
                    })
            })
        },
        forgotPasswordSubmit({ commit }, { username, code, newPassword }) {
            return new Promise((resolve, reject) => {
                Auth.forgotPasswordSubmit(username, code, newPassword).then(result => {
                    resolve(result)
                }).catch(error => {
                    reject(error.message || error)
                })
            })
        },
        signOut({ commit }) {
            return new Promise((resolve, reject) => {
                Auth.signOut().then(result => {
                    commit('removeUser')
                    resolve(result)
                }).catch(error => {
                    reject(error.message || error)
                })
            })
        }
    },
    mutations: {
        setCurrentAuthenticatedUser(state, user) {
            state.user = user
        },
        setCurrentCredentials(state, credentials) {
            state.credentials = credentials
        },
        removeUser(state) {
            state.user = null
        }
    },
    getters: {

    }
}
