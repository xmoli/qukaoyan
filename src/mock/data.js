import Mock from 'mockjs'

let note = Mock.mock({
    "note|1-10": [
        {
            'key|+1': 1,
            task: '@sentence',
            rate: '@integer(1,3)',
            readOnly: true
        }
    ]
})

note.note[note.note.length-1].readOnly = false


let mydate = new Date()
let delay = day => {
    let reslut =  mydate.getTime() + day*(24*60*60*1000)
    return new Date(reslut)
}
let date = []
date.push(delay(30),delay(360),delay(720))
let finishDate = date[0]

export default  Mock.mock({
    'user': [
        {
            "id|+1": 1,
            name: '@cname',
            event: {
                name: 'null',
                prefix: '剩余',
                suffix: '天',
                date,
                finishDate
            },
            note
        }
    ]
})