const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')

const mock =  new MockAdapter(axios, {delayResponse: 800})

mock.onGet('/').reply(200,{
    text: 'Hello world'
})