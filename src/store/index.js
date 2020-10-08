import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    note: [],
    todos:[
      {task:null, finish: 100, startTime: '10:07', status: 100},
      {task:null, finish: 25, startTime: '14:47', status: 100},
      {task:null, finish: 1, startTime: '18:47', status: 50},
      {task:null, finish: 1, startTime: '18:47', status: 50},
      {task:null, finish: 1, startTime: '18:47', status: 50},
      {task:null, finish: 1, startTime: '18:47', status: 50},
      {task:null, finish: 1, startTime: '18:47', status: 50},
      {task:null, finish: 1, startTime: '18:47', status: 50},
      {task:null, finish: 1, startTime: '', status: 50},
      {task:null, finish: 1, startTime: '', status: 50},
      {task:null, finish: 1, startTime: '', status: 50},
    ],
    pager: {
      current: 20,
    }
  },
  mutations: {
  },
  actions: {
    saveNote () {
      
    }
  },
  modules: {
  }
})
