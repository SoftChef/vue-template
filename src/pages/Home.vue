<template>
    <section class="fill-height">
        <v-container fluid>
            <v-row>
                <v-col cols="12" xs="12" sm="4">
                    <h3 id="hello">Hello {{ name }}</h3>
                    <v-text-field v-model="username" name="username"></v-text-field>
                    <v-btn name="test-button" @click="changeName">Test Click</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>
<script>
    export default {
        data() {
            return {
                name: 'World',
                username: ''
            }
        },
        methods: {
            changeName() {
                this.name = this.username.toUpperCase()
            }
        }
    }
</script>
