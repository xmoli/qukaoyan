import Vue from 'vue'
import Vuex, { createLogger } from 'vuex'
import actions from './actions'
import mutations from './mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: (process.env.NODE_ENV !== 'production'),
  plugins: [createLogger()],
  state: {
    user: {},
    event: {
      prefix: '还有',
      suffix: '天',
      date: [],
      finishDate: ''
    },
    note: [],
    noteInfo: {
      page: 0,
      current: 0
    },
    needSync: false,
    loading: false,
    Error: {}
  },
  getters: {
    dateOptions (state) {
          return state.event.date
    },
    finishDate (state) {
      return state.event.finishDate
    },
  },
  mutations,
  actions,
  modules: {
  }
})
