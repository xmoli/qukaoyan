const Mock = require('mockjs')
const fs = require('fs')
const path = require('path')

//create jwt
let prefix = new Buffer.from('prefix').toString('base64')
let suffix = new Buffer.from('suffix').toString('base64')
let info = {
    userId: new Date().getTime()
    }
let content = new Buffer.from(JSON.stringify(info)).toString('base64')

let fake_jwt_token = [prefix, content, suffix].join('.')

const note = Mock.mock({
    "note|1-10": [
        {
            'key|+1': 1,
            task: '@sentence',
            rate: '@integer(1,4)'
        }
    ]
})

let mydate = new Date()
let delay = day => {
    let reslut =  mydate.getTime() + day*(24*60*60*1000)
    return new Date(reslut)
}
let date = []

date.push(delay(30),delay(360),delay(720))
const finishDate = date[0]

const user = Mock.mock({
    "jwt": fake_jwt_token,
    'user': {
            "id": new Date().getTime(),
            avatar: '@image(50x50, #2a2aa0)',
            name: '@cname',
            event: {
                name: 'null',
                prefix: '剩余',
                suffix: '天',
                date,
                finishDate,
            },
            ...note
        }
})

fs.writeFileSync(path.resolve(__dirname, '../src/mock/data.json'), JSON.stringify(user,null,'\t'))