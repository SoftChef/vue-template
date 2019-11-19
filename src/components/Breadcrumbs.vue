<template>
    <div>
        <v-breadcrumbs :divider="divider" v-if="nodes">
            <v-breadcrumbs-item v-for="(node, index) in nodes" :key="node.text" :to="node.to" :disabled="index === nodes.length">
                {{ node.text }}
            </v-breadcrumbs-item>
        </v-breadcrumbs>
        <v-divider class="mb-4"></v-divider>
    </div>
</template>
<style scoped>
    .v-breadcrumbs {
        margin: 0;
        padding: 0 0 12px;
    }
</style>
<script>
    export default {
        props: [
            'params',
            'divider',
            'current_route'
        ],
        computed: {
            nodes() {
                const breadcrumbName = this.current_route || this.$route.name
                if (breadcrumbName) {
                    return this.$breadcrumbs(breadcrumbName, this.params)
                } else {
                    return []
                }
            }
        }
    }
</script>
