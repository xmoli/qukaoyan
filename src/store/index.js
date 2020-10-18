import Vue from 'vue'
import actions from './actions'
import mutations from './mutations'
import user from './modules/user'

import Vuex, { createLogger } from 'vuex'

const debug = process.env.NODE_ENV !== 'production'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: debug,
  plugins: debug ? [createLogger()] : [],
  state: {
    auth: {},
    event: {
      prefix: '还有',
      suffix: '天',
      date: [],
      finishDate: ''
    },
    note: [],
    todo: [],//note[current_page_index].todo 的副本
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
    user
  }
})
