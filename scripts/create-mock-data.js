const Mock = require('mockjs')
const fs = require('fs')
const path = require('path')
const intervalDay = require('./util/intervalDay')
const NumberGenerator = require('./util/NumberGenerator')

//create jwt
let prefix = new Buffer.from('prefix').toString('base64')
let suffix = new Buffer.from('suffix').toString('base64')
let info = {
    userId: new Date().getTime()
    }
let content = new Buffer.from(JSON.stringify(info)).toString('base64')

const fake_jwt_token = [prefix, content, suffix].join('.')


let date = []
date.push(intervalDay(30),intervalDay(360),intervalDay(720))
const finishDate = date[0]

let n = NumberGenerator.genNumber(0, -1)
let publishDate = []

publishDate = [1,2,3,4,5].map( ()=> {
    return intervalDay(n.next().value)
})


const note = Mock.mock({
    'note|5-8':[
        {
            'page|+1': 1,
            'publishDate': () => publishDate.pop(),
            "todo|1-5": [
                {
                    'key|+1': 1,
                    task: '@csentence',
                    rate: '@integer(1,4)'
                }
            ]
        }
    ]
})

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