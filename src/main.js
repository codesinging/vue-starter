import Vue from 'vue'

// Import element-ui
import './plugins/element.js'

// Import Vue extensions
import './utils/vue-extensions'

// Import VueLS
import './utils/vue-ls'

// Import axios
import './plugins/axios'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
