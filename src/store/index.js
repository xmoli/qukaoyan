import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    note: [],
    todos:[
      {task:1, finish: 100, startTime: '10:07', status: 100},
      {task:2, finish: 25, startTime: '14:47', status: 100},
      {task:3, finish: 1, startTime: '18:47', status: 50},
      {task:4, finish: 1, startTime: '18:47', status: 50},
      {task:5, finish: 1, startTime: '18:47', status: 50},
      {task:6, finish: 1, startTime: '18:47', status: 50},
      {task:7, finish: 1, startTime: '18:47', status: 50},
      {task:8, finish: 1, startTime: '18:47', status: 50},
      {task:9, finish: 1, startTime: '', status: 50},
      {task:10, finish: 1, startTime: '', status: 50},
      {task:11, finish: 1, startTime: '', status: 50},
    ],
    pager: [
      {index: 1, status: 50},
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
