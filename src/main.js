import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClock, faCog, faPlus, faUser, faUserPlus, faCheck, faSync, faTimes, faArrowLeft, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import './registerServiceWorker'

library.add(faClock)
library.add(faArrowLeft)
library.add(faAngleLeft)
library.add(faAngleRight)
library.add(faCog)
library.add(faPlus)
library.add(faUser)
library.add(faUserPlus)
library.add(faCheck)
library.add(faSync)
library.add(faTimes)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
