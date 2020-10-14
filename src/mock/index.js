import axios from '@/axios/config'
import MockAdapter from 'axios-mock-adapter'
import data from './data.json'
const mock =  new MockAdapter(axios)

const noteUrl = /\/v1\/note\/\d/

mock.onGet('/v1/jwt/alive').reply(200, {token: true})

mock.onGet('/v1/user/login/local').reply(200, {token: data.jwt})

mock.onGet('/v1/user/info').reply(200, {
        user: {
            name: data.user.name,
            level: Math.floor(Math.random()*2000)
        }
    })
mock.onGet('/v1/user/event').reply(200, data.user.event)

mock.onPost('/v1/user/login').reply(200, {token: true})

mock.onPut('/v1/user/info').reply(200)

mock.onDelete('/v1/user/destruction').reply(200)

mock.onGet(noteUrl).reply(200, data.user.note)
mock.onGet('/v1/note/today').reply(200,{note: data.user.note[0]})
mock.onGet('/v1/note/total').reply(200, {total: data.user.note.length})
mock.onPost('/v1/note/add').reply(200)
mock.onPut('/v1/note/today').reply(200)
mock.onAny().reply(500)

export {axios}

export {mock}

export default {
    axios,
    mock
}