<template>
    <div id="modal" v-show="loading">
        <v-layout class="text-sm-center" align-center>
            <v-flex xs12>
                <v-progress-circular indeterminate :size="70"></v-progress-circular>
                <br />
                <p class="mt-3">{{ $t('Loading...') }}</p>
            </v-flex>
        </v-layout>
    </div>
</template>
<style scoped>
    #modal {
        width: 100%;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 9999;
        animation: modal linear 1s forwards;
    }
    .v-card {
        background: none;
    }
    .layout {
        height: 100vh;
    }
    p {
        width: 200px;
        font-size: 20px;
        white-space: nowrap;
        overflow: hidden;
        display: inline-block;
        animation: type 3s infinite;
    }
    @keyframes type {
        from {
            width: 0;
        }
    }
    @keyframes modal {
        0% {
            background: rgba(0, 0, 0, 0);
        }
        100% {
            background: rgba(0, 0, 0, 0.5);
        }
    }
</style>
<script>
    import { mapState } from 'vuex'
    export default {
        data() {
            return {

            }
        },
        created() {

        },
        computed: {
            ...mapState({
                loading: state => {
                    return state.loading.status
                }
            })
        }
    }
</script>
