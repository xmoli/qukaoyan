import axios from '@/axios'

import StorageToken from '@/util/StorageToken'

export default {
    saveNoteToday ({state, commit}) {
      commit('loading', true)
      axios.put('/v1/note/today', state.todo)
        .then( response => {
          if (response.status === 200) {
            commit('TODO_SAVE')
            commit('syncFlag', false)
            commit('loading', false)
          }
        })
        .catch( err => {
          commit('syncFlag', false)
          commit('error',{type:'syncError', message: err})
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
      return new Promise( (resolve, reject) => {
        context.dispatch('getNoteInfo')
          .then(()=>{
            axios.get(`/v1/note/${page}`)
              .then( response => {
                context.commit('getNote', response.data.note)
                resolve()
              })
              .catch( err => {
                let message = `page: ${page}
                  ${err}`
                context.commit('error', {type: 'normal', message})
                reject(err)
              })
          })
      })
    },
    getNoteToday ({commit, dispatch, state}) {
      return new Promise( (resolve, reject) => {
        dispatch('getNoteInfo')
          .then( () => {
            axios.get(`/v1/note/today`)
              .then( response => {
                commit('PAGE_CURRENT', state.noteInfo.page)
                commit('getNoteToday', response.data.todo)
                resolve()
              })
              .catch( err => {
                commit('error', {type: 'normal', message: err})
                reject(err)
              })
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