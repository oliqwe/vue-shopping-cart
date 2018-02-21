import Vue from 'vue'
import App from './App'
import router from './router/router'
import store from './store/store'

// Require the main Sass manifest file
require('./assets/css/main.scss');

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
