import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    note: [],
    todos: new Array(1).fill({task: null}),
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
    },
    addTask (state) {
      state.todos.push({ task: null})
    },
    updateTask (state, {index, task}) {
      state.todos[index].task = task
      console.log(state.todos)
    }
  },
  actions: {
    autoSaveTodos () {
      
    }
  },
  modules: {
  }
})
