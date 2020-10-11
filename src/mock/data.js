const Mock = require('mockjs')

let note = Mock.mock({
    "note|1-300": [
        {
            'key|+1': 1,
            task: '@sentence',
            rate: '@integer(1,3)',
            readOnly: true
        }
    ]
})
note.note[note.note.length-1].readOnly = false

module.exports =  Mock.mock({
    'user|1-2': [
        {
            "id|+1": 1,
            name: '@cname',
            note
        }
    ]
})