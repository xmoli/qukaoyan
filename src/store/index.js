import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    note: [],
    needSync: false,
    todos: new Array(1).fill({task: null,rate: 0, key: new Date().getTime()}),
    endDateOptions: [],
    pager: {
      maxPage: 10,
      current: 10,
    },
    Error: {}
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
      state.needSync = true
      state.todos.push({ task: null, rate: 0, key: new Date().getTime()})
    },
    removeTask (state, index) {
      state.needSync = true
      state.todos.splice(index, 1)
    },
    updateTask (state, {index, task}) {
      state.needSync = true
      state.todos[index].task = task
    },
    updateRate (state, {index, rate}) {
      state.needSync = true
      state.todos[index].rate = rate
    },
    syncNote (state, {page, todos}) {
      if (page >= 1) {
        if (state.note[page-1] === null) {
          state.note.splice(page-1,1, todos)
        }
      }
    },
    updateNote (state, newTodos) {
      state.todos = newTodos
    },
    auth (state) {
      state.user.authorized = true
    },
    error (state, {type, message}) {
      state.Error[type] = message
    }
  },
  actions: {
    saveNoteToday (context) {
      axios.get('/v1/note/today')
        .then( response => {
          if (response.ok) {
            context.state.needSync = false
          }
        })
        .catch( err => {
          context.commit('error',{type:'syncError', message: err})
        })
    },
    getNote (context, id) {
      axios.get(`/v1/note/${id}`)
        .then( response => {
          context.commit('syncNote', {note: response.data})
        })
        .cath( err => {
          let message = `noteid:${id}
            ${err}`
          context.commit('error', {type: 'noraml', message})
        })
    },
    login (context, user) {
      axios.post('/v1/user/login',user)
        .then( response => {
          context.commit('auth')
          localStorage.setItem('AUTH_TOKEN',response.data.token)
        })
        .catch(err => {
          context.commit('error', {type: 'authorizedError', message: err})
        })
    },
    getUserInfo (context) {
      axios.get('/v1/user/info')
        .then( response => {
          context.commit('user', response.data.user)
        })
        .catch( err => {
          context.commit('Error', {type: 'normal', message: err})
        })
    },
    updateUserInfo (context, user) {
      axios.put('/v1/user/info',user)
        .then( response => {
          context.commit('user', user)
        })
        .catch( err => {
          context.commit('Error', {type: 'noraml', message: err})
        })
    }
  },
  modules: {
  }
})
