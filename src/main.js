import Vue from 'vue'

// Import element-ui
import './plugins/element.js'

// Import Vue extensions
import './utils/vue-extensions'

// Import Vue filters
import './utils/vue-filters'

// Import VueLS
import './utils/vue-ls'

// Import axios
import './plugins/axios'

// App
import App from './App.vue'

// Vue router
import router from './router'

// Vuex
import store from './store'

// Import css
import './assets/sass/app.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
