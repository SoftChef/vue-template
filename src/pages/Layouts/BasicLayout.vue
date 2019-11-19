<template>
    <v-app>
        <message></message>
        <loading></loading>
        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="d-flex d-sm-none"></v-app-bar-nav-icon>
            <v-toolbar-title>
                <span class="font-weight-black blue--text">Vue Template</span>
            </v-toolbar-title>
            <span class="mr-5"></span>
            <!-- <div class="toolbar-link">
                <a>LINK-1</a>
            </div> -->
            <v-spacer></v-spacer>
            <div class="toolbar-link d-none d-md-flex">
                <!-- <v-menu transition="slide-y-transition" :close-on-content-click="false" bottom :nudge-width="100" :nudge-left="100" :nudge-bottom="20" offset-y>
                    <template v-slot:activator="{ on }">
                        <v-btn icon v-on="on">
                            <v-icon>language</v-icon>
                        </v-btn>
                    </template>
                    <v-list class="py-0 toolbar-menu" light>
                        <template v-for="(item, index) in locales">
                            <v-list-item @click="locale = item.value" :key="`lang_${index}`">
                                <v-list-item-content>
                                    <v-list-item-title class="body-1">{{ item.text }}</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                            <v-divider :key="`lang_divider_${index}`" v-if="(index + 1) < locales.length"></v-divider>
                        </template>
                    </v-list>
                </v-menu> -->
            </div>
        </v-app-bar>
        <v-navigation-drawer app fixed :permanent="$vuetify.breakpoint.mdAndUp" :expand-on-hover="$vuetify.breakpoint.mdAndUp" v-model="drawer">
            <v-list>
                <template v-for="(navigation, key) in navigations">
                    <v-list-item link :to="navigation.to" :key="key">
                        <v-list-item-icon>
                            <v-icon>{{ navigation.icon }}</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>{{ navigation.title }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
            <template v-slot:append>
                <div class="pa-2 text-center">
                    <v-btn icon @click="logout">
                        <v-icon>logout</v-icon>
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>
        <v-content>
            <v-container fluid>
               <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>
<script>
    export default {
        data() {
            return {
                drawer: false,
                navigations: [
                    {
                        icon: 'mdi-home',
                        title: 'Home',
                        to: {
                            name: 'home'
                        }
                    }
                ]
            }
        },
        mounted() {

        },
        computed: {
            locales() {
                return this.$store.state.locales
            },
            locale: {
                get() {
                    return this.$i18n.locale
                },
                set(locale) {
                    localStorage.setItem('locale', locale)
                    this.$i18n.locale = locale
                    // window.location.reload()
                }
            },
            showLocale() {
                const lang = this.locales.find((item) => {
                    return item.value === this.locale
                })
                return lang.text || this.locale
            }
        },
        created() {

        },
        methods: {
            logout() {
            //     this.$Amplify.Auth.signOut()
            //     this.$router.replace({
            //         name: 'authenticate.signIn'
            //     })
            }
        }
    }
</script>
