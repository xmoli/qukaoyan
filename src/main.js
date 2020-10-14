import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faClock,  faBackward, faForward, faCog, faPlus, faUser, faUserPlus, faCheck, faSync } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'
import './registerServiceWorker'

library.add(faClock)
library.add(faBackward)
library.add(faForward)
library.add(faCog)
library.add(faPlus)
library.add(faUser)
library.add(faUserPlus)
library.add(faCheck)
library.add(faSync)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
