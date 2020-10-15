import axios from '@/axios'

import StorageToken from '@/util/StorageToken'

export default {
    saveNoteToday (context, note) {
      context.commit('loading', true)
      axios.put('/v1/note/today', note)
        .then( response => {
          if (response.status === 200) {
            context.commit('syncFlag', false)
            context.commit('loading', false)
          }
        })
        .catch( err => {
          context.commit('syncFlag', false)
          context.commit('error',{type:'syncError', message: err})
        })
    },

    getNoteTotal ({commit}) {
      return new Promise( (resolve, reject) => {
        axios.get('/v1/note/total')
          .then( response => {
            commit('syncPage', response.data)
            resolve()
          })
          .catch(err =>{
            commit('error', {type: 'noraml', message: err})
            reject()
          })
      })
    },
    getNote (context, page_id) {
      axios.get(`/v1/note/${page_id}`)
        .then( response => {
          context.commit('syncNote', response.data)
        })
        .catch( err => {
          let message = `noteid:${page_id}
            ${err}`
          context.commit('error', {type: 'noraml', message})
        })
    },
    getNoteToday ({commit}) {
      axios.get(`/v1/note/today`)
        .then( response => {
          commit('syncNote', response.data)
        })
        .catch( err => {
          commit('error', {type: 'noraml', message: err})
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
          new StorageToken().set(response.data.token)
        })
        .catch(err => {
          context.commit('error', {type: 'authorizedError', message: err})
        })
    },
    loginLocal ({commit}) {
      axios.get('/v1/user/login/local')
        .then( response => {
          if (response.data.token) {
            new StorageToken().add(response.data.token)
            commit('auth', {authorized: true})
          }
        })
        .catch( err => {
          commit('error', {type: 'authError', message: err})
        })
    },
    getUserInfo (context) {
      axios.get('/v1/user/info')
        .then( response => {
          context.commit('user', response.data.user)
        })
        .catch( err => {
          context.commit('error', {type: 'normal', message: err})
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
          context.commit('error', {type: 'noraml', message: err})
        })
    },
    getUserEvent (context) {
      axios.get('/v1/user/event')
        .then( response => {
          context.commit('userEvent', response.data)
        })
        .catch( err => {
          context.commit('error', {type: 'noraml', message: err})
        })
    },
    tokenTest ({commit, dispatch}) {
      axios.get('/v1/jwt/alive')
        .then( response => {
            commit('auth', {authrized: response.data.token})
        })
        .catch( err => {
          commit('error', {type: 'authError', message: err})
          commit('auth', {authorized: false})
          dispatch('loginLocal')
        })
    }
  }