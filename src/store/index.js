import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    event: {},
    note: [],
    needSync: false,
    todos: new Array(1).fill({task: null,rate: 0, key: new Date().getTime()}),
    pager: {
      maxPage: 10,
      current: 10,
    },
    Error: {}
  },
  getters: {
    dateOptions (state) {
          return state.event.date
    },
    finishDate (state) {
      return state.event.finishDate
    }
  },
  mutations: {
    decrement (state) {
      if ( 0 < state.pager.current) {
        state.pager.current --
      }
    },
    increment (state) {
      if (state.pager.current != state.pager.maxPage) {
        state.pager.current ++
      }
    },
    turn (state, value) {
      const page = Number.parseInt(value)
      let max = state.pager.maxPage
      if ((page !== Number.NaN) && (page < max) && (page > 0)) {
        state.pager.current = page
      }
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
      if (state.todos[index].task) {
        state.needSync = true
      }
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
    event (state, event) {
      state.event = event
    },
    progressFlag (state, bool) {
      state.progress = bool
    },
    syncFlag (state, bool) {
      state.needSync = bool
    },
    error (state, {type, message}) {
      state.Error[type] = message
    }
  },
  actions: {
    saveNoteToday (context, note) {
      console.log('save:', note)
      context.commit('progressFlag', true)
      axios.post('/v1/note/today', note)
        .then( response => {
          if (response.ok) {
            context.commit('syncFlag', false)
            context.commit('progressFlag', false)
          }
        })
        .catch( err => {
          context.commit('syncFlag', false)
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
    loginLocal (context) {
      axios.get('/v1/user/login/local')
        .then( response => {
          context.commit('auth')
          localStorage.setItem('AUTH_TOKEN',response.data.token)
        })
        .catch( err => {
          context.commit('Error', {type: 'noraml', message: err})
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
          if (response.ok) {
            context.commit('user', user)
          }
        })
        .catch( err => {
          context.commit('Error', {type: 'noraml', message: err})
        })
    },
    getUserEvent (context) {
      axios.get('/v1/user/event')
        .then( response => {
          context.commit('event', response.data)
        })
        .catch( err => {
          context.commit('Error', {type: 'noraml', message: err})
        })
    },
    test (){
      axios.get('/test')
        .then( response => {
          console.log(response.data)
        })
        .catch( err => {
          console.log(err)
        })
    }
  },
  modules: {
  }
})
