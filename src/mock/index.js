import axios from '../axios/config'
import MockAdapter from 'axios-mock-adapter'
import Data from './data'

const mock =  new MockAdapter(axios)

mock
    .onGet('/test').reply(200,{text: 'Hello World!'})
    .onPost('v1/user/register').reply(200)
    .onPost('v1/user/login').reply(200,{
        token: btoa('This is a token')
    })
    .onPut('/v1/user/info').reply(200)
    .onGet('/v1/user/info').reply(200, {
        user: {
            name: Data.user[0].name,
            level: Math.floor(Math.random()*6)
        }
    })
    .onGet('/v1/user/event').reply(200, Data.user[0].event)
    .onDelete('v1/user/destruction').reply(200)


const userUri = '/v1/note/'
const noteUrl = new RegExp(`${userUri}\\d`)
mock.onGet(noteUrl).reply(200, {
        note: Data.user[0].note[Math.floor(Math.random()*Data.user[0].note.length)]
    })
    .onGet('v1/note/today').reply(200,{
        note: []
    })
    .onGet('v1/note/total').reply(200, {total: Data.user[0].note.length})
    .onPost('v1/note/add').reply(200)
    .onPut('/v1/note/today').reply(200)
    .onAny().reply(500)
