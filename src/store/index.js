import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    note: [],
    todos: new Array(1).fill({task: null}),
    endDate: '',
    pager: {
      maxPage: 10,
      current: 10,
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
    removeTask (state, index) {
      state.todos.splice(index, 1)
    },
    updateTask (state, {index, task}) {
      state.todos[index].task = task
      console.log(state.todos)
    },
    addTodos (state, {page, todos}) {
      if (page >= 1) {
        state.note.splice(page-1,1, todos)
      }
    },
    updateTodos (state, newTodos) {
      state.todos = newTodos
    }
  },
  actions: {
    autoSaveTodos () {
      
    }
  },
  modules: {
  }
})
