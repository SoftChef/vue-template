<template>
    <v-container>
        <v-alert :value="errorMessage" type="error">{{ errorMessage }}</v-alert>
        <template v-if="form === 'forgotPassword'">
            <v-layout row wrap>
                <v-flex xs12>
                    <p class="text-xs-center primary--text">We will send a letter to your mailbox, <br />please go to the mailbox to confirm the letter.</p>
                </v-flex>
                <v-flex xs12>
                    <v-text-field type="text" label="Forgot password?" v-model="username"></v-text-field>
                </v-flex>
                <v-flex xs12 class="text-xs-center mt-5">
                    <v-btn outline color="primary" class="px-5" @click="forgotPassword">{{ $t('Send') }}</v-btn>
                </v-flex>
            </v-layout>
        </template>
        <template v-if="form === 'changeNewPassword'">
            <v-layout row wrap>
                <v-flex xs12>
                    <v-text-field type="password" :label="$t('Code')" v-model="code"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field type="password" :label="$t('New password')" v-model="newPassword"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field type="password" :label="$t('Confirm new password')" v-model="confirmNewPassword"></v-text-field>
                </v-flex>
                <v-flex xs12 sm-6 offset-sm3>
                    <v-btn outline color="primary" @click="changeNewPassword">{{ $t('Change') }}</v-btn>
                </v-flex>
            </v-layout>
        </template>
    </v-container>
</template>
<script>
    export default {
        data() {
            return {
                form: 'forgotPassword',
                user: null,
                username: '',
                code: '',
                password: '',
                newPassword: '',
                confirmNewPassword: '',
                errorMessage: ''
            }
        },
        created() {

        },
        methods: {
            forgotPassword() {
                this.$store.dispatch('Authenticates/forgotPassword', {
                    username: this.username
                }).then(result => {
                    if (result.CodeDeliveryDetails) {
                        this.form = 'changeNewPassword'
                    }
                }, error => {
                    this.errorMessage = error
                })
            },
            changeNewPassword() {
                if (!this.code) {
                    this.errorMessage = this.$t('Reset code can\'t empty.')
                    return
                }
                if (this.newPassword !== this.confirmNewPassword) {
                    this.errorMessage = this.$t('Confirm new password can\'t matched.')
                    return
                }
                this.$store.dispatch('Authenticates/forgotPasswordSubmit', {
                    username: this.username,
                    code: this.code,
                    newPassword: this.newPassword
                }).then(result => {
                    this.$store.commit('showSuccess', {
                        text: this.$t('Change password success, please login.')
                    })
                    this.$router.replace({
                        name: 'authenticate.signIn'
                    })
                }, error => {
                    this.errorMessage = error
                })
            }
        }
    }
</script>
