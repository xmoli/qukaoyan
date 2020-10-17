import axios from '@/axios'

import StorageToken from '@/util/StorageToken'

export default {
    saveNoteToday (context, todo) {
      context.commit('loading', true)
      axios.put('/v1/note/today', todo)
        .then( response => {
          if (response.status === 200) {
            context.commit('getNoteToday', todo)
            context.commit('syncFlag', false)
            context.commit('loading', false)
          }
        })
        .catch( err => {
          context.commit('syncFlag', false)
          context.commit('error',{type:'syncError', message: err})
        })
    },

    getNoteInfo ({commit}) {
      return new Promise( (resolve, reject) => {
        axios.get('/v1/info/note')
          .then( response => {
            commit('PAGE', response.data.page)
            resolve()
          })
          .catch(err =>{
            commit('error', {type: 'noraml', message: err})
            reject()
          })
      })
    },
    getNote (context, page) {
      context.dispatch('getNoteInfo')
        .then(()=>{
          axios.get(`/v1/note/${page}`)
            .then( response => {
              context.commit('getNote', response.data.note)
            })
            .catch( err => {
              let message = `page: ${page}
                ${err}`
              context.commit('error', {type: 'normal', message})
            })
        })
    },
    getNoteToday ({commit, dispatch, state}) {
      dispatch('getNoteInfo')
        .then( () => {
          axios.get(`/v1/note/today`)
            .then( response => {
              commit('PAGE_CURRENT', state.noteInfo.page)
              commit('getNoteToday', response.data.todo)
            })
            .catch( err => {
              commit('error', {type: 'normal', message: err})
            })
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
    getUserEvent (context) {
      axios.get('/v1/user/event')
        .then( response => {
          context.commit('userEvent', response.data)
        })
        .catch( err => {
          context.commit('error', {type: 'normal', message: err})
        })
    },
    tokenTest ({commit, dispatch}) {
      axios.get('/v1/jwt/alive')
        .then( response => {
            commit('auth', response.data.token)
        })
        .catch( err => {
          commit('error', {type: 'authError', message: err})
          commit('auth', false)
          dispatch('loginLocal')
        })
    }
  }