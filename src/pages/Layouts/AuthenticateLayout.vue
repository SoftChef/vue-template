<template>
    <v-app id="auth-app">
        <v-container fluid grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 md4 offset-md4 class="mt-4">
                    <div class="auth-logo"></div>
                </v-flex>
                <v-flex xs12 md4 offset-md4>
                    <v-content id="content">
                        <router-view></router-view>
                    </v-content>
                </v-flex>
            </v-layout>
        </v-container>
        <message></message>
    </v-app>
</template>
<script>
    export default {

    }
</script>
