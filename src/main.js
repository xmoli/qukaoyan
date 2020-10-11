import Vue from 'vue'
import App from './App.vue'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faClock, faPlay, faCheck, faPause, faBackward, faPrint, faForward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import router from './router'

library.add(faPlus)
library.add(faClock)
library.add(faPlay)
library.add(faCheck)
library.add(faPause)
library.add(faBackward)
library.add(faForward)
library.add(faPrint)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
