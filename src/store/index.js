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
      maxPage: 20,
      current: 20,
    }
  },
  mutations: {
    decrement (state) {
      state.pager.current --
    },
    increment (state) {
      state.pager.current ++
    },
    turn (state, page) {
      state.pager.current = page
    }
  },
  actions: {
    saveNote () {
      
    }
  },
  modules: {
  }
})
