import axios from '@/axios'

import StorageToken from '@/util/StorageToken'

export default {
    state: () => ({
        userInfo: {}
    }),
    mutations: {
        USER_INFO$SET (state, userInfo) {
            state.userInfo = userInfo
        }
    },
    actions: {
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
        getUserInfo (context) {
            axios.get('/v1/user/info')
                .then( response => {
                    context.commit('userInfo', response.data.user)
                })
                    .catch( err => {
                    context.commit('error', {type: 'normal', message: err})
                })
        },
        updateUserInfo (context, user) {
            axios.put('/v1/user/info',user)
                .then( response => {
                    if (response.ok) {
                        context.commit('userInfo', user)
                    }
                })
                .catch( err => {
                    context.commit('error', {type: 'normal', message: err})
                })
        },
    }
}