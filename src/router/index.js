import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import auth from '@/utils/auth'
import config from '@/configs/app.config'

Vue.use(VueRouter)

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
    // Set page title
    document.title = (to.meta.title?to.meta.title + '-' : '') + (config.subName ? config.subName+'-':'') + config.name

    // Check authentication
    if (to.meta.auth){
        if (auth.check()){
            next()
        } else {
            next('/auth')
        }
    } else {
        next()
    }
})

export default router
