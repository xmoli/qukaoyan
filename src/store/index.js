import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    event: {
      Date: ['2020-12-10', '2021-12-10', '2022-12-10'],
      finishDate: '2020-12-10'
    },
    note: [],
    needSync: false,
    todos: new Array(1).fill({task: null,rate: 0, key: new Date().getTime()}),
    pager: {
      maxPage: 2,
      current: 1,
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
    turn (state, page) {
      let max = state.pager.maxPage
      if ((page <= max) && (page > 0)) {
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
      console.log(state.Error)
    }
  },
  actions: {
    saveNoteToday (context, note) {
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
    getNote (context, page_id) {
      axios.get(`/v1/note/${page_id}`)
        .then( response => {
          context.commit('syncNote', {note: response.data})
        })
        .catch( err => {
          let message = `noteid:${page_id}
            ${err}`
          context.commit('error', {type: 'noraml', message})
        })
    },
    increment ( { state, commit, dispatch } ) {
      const pre = state.pager.current
      commit('increment')
      const cur = state.pager.current
      if ((pre !== cur) && (cur !== 0)) {
        dispatch('getNote', cur)
      }
    },
    decrement ( { state, commit, dispatch } ) {
      const pre = state.pager.current
      commit('decrement')
      const cur = state.pager.current
      if ((pre !== cur) && (cur !== 0)) {
        dispatch('getNote', cur)
      }
    },
    turnToPage ( context, page) {
      const preCommit = context.state.pager.current
      context.commit('turn', page)
      const cur = context.state.pager.current
      if ((preCommit !== cur) && (cur !== 0)) {
        context.dispatch('getNote', context.state.pager.current)
      }
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
