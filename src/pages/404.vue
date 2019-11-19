<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 class="text-sm-center">
                <div>
                    <h3 class="blue-grey--text">404</h3>
                    <p class="blue-grey--text">The page could not be found or you don't have permission to view it.</p>
                    <v-divider></v-divider>
                    <div class="blue-grey--text">
                        <small>The resource that you are attempting to access does not exist or you don't have the necessary permissions to view it.</small>
                        <br />
                        <small>Make sure the address is correct and that the page hasn't moved.</small>
                    </div>
                </div>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        computed: {

        }
    }
</script>
