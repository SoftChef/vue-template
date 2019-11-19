import Vue from 'vue'
import Router from 'vue-router'

// import stores from './stores'
import authenticateRoutes from './pages/Authenticates/routes'

import BasicLayout from './pages/Layouts/BasicLayout.vue'
import HomePage from './pages/Home.vue'
import ErrorPage from './pages/404.vue'

Vue.use(Router)

const baseRoutes = [
    {
        path: '*',
        component: ErrorPage
    },
    {
        path: '/',
        redirect: 'home'
    },
    {
        path: '/',
        components: {
            default: BasicLayout
        },
        children: [
            {
                path: 'home',
                name: 'home',
                component: HomePage,
                meta: {
                    isAuthed: true
                }
            }
        ]
    }
]

const router = new Router({
    mode: 'hash',
    routes: [
        ...baseRoutes,
        ...authenticateRoutes
    ]
})

router.beforeEach(async(to, from, next) => {
    if (to.matched.some(record => {
        return record.meta.isAuthed
    })) {
        // stores.dispatch('Authenticates/getCurrentAuthenticatedUser').then(user => {
        //     if (user) {
                next()
        //     } else {
        //         router.replace({
        //             name: 'auth.signIn'
        //         })
        //     }
        // }).catch(error => {
        //     console.log('Error', error)
        // })
    } else {
        next()
    }
})

export default router
