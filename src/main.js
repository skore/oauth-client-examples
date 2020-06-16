import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'

let authHeaders = {}
const auth = window.localStorage.getItem('currentAuth')

Vue.prototype.$auth = auth || {}

if (auth) {
  authHeaders = {
    Authorization: auth?.access_token
  }
}

Vue.prototype.$http = Axios.create({
  baseURL: process.env.VUE_APP_SKORE_URL,
  headers: {...authHeaders},
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
