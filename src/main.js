import Vue from 'vue'
import router from './router/router'
import App from './App.vue'
import './registerServiceWorker'
import store from './store'
// Подключаем normalize
import '../node_modules/normalize.css/'
// Подключаем наши стили
import './css/style.less'
// Подключаем библиотеку с анимациями
import animate from 'animate.css'
// Поключаем библиотеку fortawesome
import FortAwesome from '@fortawesome/fontawesome-free/css/all.css'
// Устанавливаем axios для работы с запросами
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
