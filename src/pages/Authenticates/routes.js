import Layout from '../Layouts/AuthenticateLayout.vue'
import SignIn from './SignIn.vue'
import Forgot from './Forgot.vue'

export default [
    {
        path: '/authenticates',
        components: {
            default: Layout
        },
        children: [
            {
                path: 'signIn',
                name: 'authenticate.signIn',
                component: SignIn
            },
            {
                path: 'forgot',
                name: 'authenticate.forgot',
                component: Forgot
            }
        ]
    }
]
