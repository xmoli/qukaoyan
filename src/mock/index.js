import axios from '../axios/config'
import MockAdapter from 'axios-mock-adapter'
import Data from './data'

const mock =  new MockAdapter(axios, {delayResponse: 800, onNoMatch: "throwException" })

mock.onPost('v1/user/register').reply(200)
    .onPost('v1/user/authoried').reply(200,{
        token: btoa('This is a token')
    })
    .onDelete('v1/user/destruction').reply(200)


const userUri = '/v1/note/'
const noteUrl = new RegExp(`${userUri}\d`)
mock.onGet(noteUrl).reply(200, {
        note: Data.user[0].note[Math.floor(Math.random()*Data.user[0].note.length)]
    })
    onGet('v1/note/today').reply(200,{
        note: []
    })
    .onGet('v1/note/total').reply(200, {total: Data.user[0].note.length})
    .onPost('v1/note/add').reply(200)
    .onPut(noteUrl).reply(200)
    .onAny().reply(500)
