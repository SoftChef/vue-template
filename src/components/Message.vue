<template>
    <div class="message">
        <v-card v-for="(item, index) in messages" :key="index + 'e'" :color="item.color" dark @click.stop="click(item)" class="message-card ma-2">
            <v-progress-linear v-if="!item.clicked" class="pa-0 ma-0" height="1" :value="item.time"></v-progress-linear>
            <v-layout justify-center align-center class="pa-3">
                <v-icon class="mr-2">{{ item.icon || 'notice' }}</v-icon>
                <div style="width: 80%; word-wrap: break-word" v-html="item.text"></div>
                <v-spacer></v-spacer>
                <v-btn icon @click.native="remove(index)">
                    <v-icon>close</v-icon>
                </v-btn>
            </v-layout>
        </v-card>
    </div>
</template>
<style scoped>
    .message {
        top : 0;
        right : 0;
        position : fixed;
        z-index : 2100;
    }
    .message-card {
        width : 80vw;
        max-width : 380px;
    }
</style>

<script>
    export default {
        data() {
            return {
                keep: 100,
                messages: [],
                interval: setInterval(this.update, 100)
            }
        },
        watch: {
            '$store.state.toast': {
                handler: function() {
                    this.messages.unshift({
                        ...this.$store.state.toast,
                        time: this.keep,
                        remove: false,
                        clicked: false
                    })
                },
                deep: true
            }
        },
        methods: {
            remove(index) {
                this.messages[index].remove = true
                this.clear()
            },
            update() {
                let clear = false
                for (let message of this.messages) {
                    if (message.clicked) {
                        continue
                    }
                    if (message.time < 0) {
                        clear = true
                        message.remove = true
                    }
                    message.time -= 2
                }
                if (clear) {
                    this.clear()
                }
            },
            clear() {
                this.messages = this.messages.filter((e) => {
                    return e.remove === false
                })
            },
            click(message) {
                message.clicked = true
            }
        },
        destroyed() {
            clearInterval(this.interval)
        }
    }
</script>
