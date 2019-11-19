<template>
    <v-container>
        <v-alert :value="errorMessage !== ''" type="error">{{ errorMessage }}</v-alert>
        <template v-if="form === 'signIn'">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-text-field type="text" :label="$t('Username')" row-height="24" v-model="username"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field type="password" :label="$t('Password')" row-height="24" v-model="password"></v-text-field>
                </v-flex>
                <v-flex xs12 class="text-xs-center">
                    <router-link :to="{ name: 'authenticate.forgot' }" class="grey--text">{{ $t('Forgot password?') }}</router-link>
                </v-flex>
                <v-flex xs12 class="text-xs-center mt-5">
                    <v-btn color="primary" class="px-5" @click="signIn">{{ $t('Login') }}</v-btn>
                </v-flex>
            </v-layout>
        </template>
        <template v-if="form === 'changeNewPassword'">
            <v-layout row wrap>
                <v-flex xs12>
                    <p class="text-xs-center primary--text">Welcome to login system,<br />please change new password.</p>
                </v-flex>
                <v-flex xs12>
                    <v-text-field type="password" :label="$t('New password')" v-model="newPassword"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field type="password" :label="$t('Confirm new password')" v-model="confirmNewPassword"></v-text-field>
                </v-flex>
                <v-flex xs12 sm-6 offset-sm3>
                    <v-btn color="primary" :disabled="!newPassword || newPassword !== confirmNewPassword" @click="changeNewPassword">{{ $t('Change') }}</v-btn>
                </v-flex>
            </v-layout>
        </template>
    </v-container>
</template>
<script>
    export default {
        data() {
            return {
                form: 'signIn',
                user: null,
                username: '',
                password: '',
                newPassword: '',
                confirmNewPassword: '',
                errorMessage: ''
            }
        },
        created() {

        },
        methods: {
            signIn() {
                this.$store.dispatch('Authenticates/signIn', {
                    username: this.username,
                    password: this.password
                }).then(result => {
                    this.user = result
                    if (result.challengeName === 'NEW_PASSWORD_REQUIRED') {
                        this.form = 'changeNewPassword'
                        this.username = ''
                        this.password = ''
                    } else if (result.challengeName && result.challengeName !== '') {
                        alert(`Not ready to implement this challenge ${result.challengeName}`)
                    } else {
                        this.$router.replace({
                            name: 'home'
                        }, () => {
                            window.location.reload()
                        })
                    }
                }, error => {
                    this.errorMessage = error
                })
            },
            changeNewPassword() {
                if (this.newPassword !== this.confirmNewPassword) {
                    this.errorMessage = `Confirm new password can't matched`
                }
                this.$store.dispatch('Authenticates/changeNewPassword', {
                    user: this.user,
                    newPassword: this.newPassword
                }).then(result => {
                    this.$store.commit('showSuccess', {
                        text: this.$t('Change password success, please login again.')
                    })
                    this.newPassword = ''
                    this.confirmNewPassword = ''
                    this.form = 'signIn'
                }, error => {
                    this.errorMessage = error
                })
            }
        }
    }
</script>
