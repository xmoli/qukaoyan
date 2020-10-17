import axios from '@/axios'

import StorageToken from '@/util/StorageToken'

export default {
    state: () => ({
        userInfo: {},
        userInfoLocal: {}
    }),
    mutations: {
        USER_INFO$SET (state, info) {
            state.userInfo = info
        },
        USER_INFO_LOCAL$GET (state) {
            //保证userInfo 的独立性
            state.userInfoLocal = Object.assign({}, state.userInfo)
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
                    context.commit('USER_INFO$SET', response.data.user)
                    context.commit('USER_INFO_LOCAL$GET')
                })
                    .catch( err => {
                    context.commit('error', {type: 'normal', message: err})
                })
        },
        updateUserInfo (context) {
            return new Promise( (resolve, reject) => {
                axios.put('/v1/user/info', context.state.userInfoLocal)
                    .then( response => {
                        if (response.status === 200) {
                            context.commit('USER_INFO$SET', context.state.userInfoLocal)
                            resolve()
                        }
                    })
                    .catch( err => {
                        context.commit('error', {type: 'normal', message: err})
                        reject()
                    })
            })
        },
    }
}