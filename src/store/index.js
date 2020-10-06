import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos:[
      {task:1, finish: 100, startTime: '10-07', status: 'finish'},
      {task:2, finish: 25, startTime: '14-47', status: 'active'},
      {task:3, finish: 1, startTime: '18-47', status: 'ready'},
    ],
    pager: [
      {index: 1, status: 'active'},
      {index: 2, status: 'ready'},
    ]
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
