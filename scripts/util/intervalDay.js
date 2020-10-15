
let mydate = new Date()
module.exports =  (day) => {
    let result =  mydate.getTime() + day*(24*60*60*1000)
    return new Date(result)
}