import Vue from 'vue'
import VueBreadcrumbs from 'vuejs2-breadcrumbs'
// import BreadcrumbsComponent from './components/Breadcrumbs.vue'
// import i18n from './i18n'

// const $t = (text, params) => {
//     return i18n.t(text, params)
// }

Vue.use(VueBreadcrumbs, {
    // template: BreadcrumbsComponent,
    breadcrumbs: {
        'home'() {
            return {
                parent: null,
                links: [
                    {
                        text: 'Home',
                        to: {
                            name: 'home'
                        }
                    }
                ]
            }
        }
    }
})

export default VueBreadcrumbs
