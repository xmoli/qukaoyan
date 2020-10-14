import jwt_decode from 'jwt-decode'

const KEY_PREFIX = 'jwt-'
const KEY_TOKEN = 'AUTH_TOKEN_KEY'

class StoragedToken {
    constructor () {
        //所有token的键的地址，值为一维列表
        this.keyList = KEY_PREFIX + 'list'
        //当前使用的token的键的地址，值为一个键
        this.keyToken = KEY_TOKEN
        //token的键，值为token
        this.keyUser = KEY_PREFIX + 'userid'
    }
    /*
    * 获取token
    */
    token () {
        const key = window.localStorage.getItem(this.keyToken)
        return window.localStorage.getItem(key)
    }
    //获取token的键集
    getList () {
        let list_str = localStorage.getItem(this.keyList)
        return JSON.parse(list_str)
    }
    set (jwt) {
        let key = this.add(jwt)
        window.localStorage.setItem(this.keyToken, key)
    }
    //添加token
    add (jwt) {
        let decoded = jwt_decode(jwt)
        window.localStorage.setItem(this.keyUser, decoded.userid)

        let tokenSet
        try {
            tokenSet = new Set(this.getList())
        } catch {
            tokenSet = new Set()
        }
        tokenSet.add(decoded.userid)
         
        let tokenString = JSON.stringify(tokenSet)
        window.localStorage.setItem(this.keyList, tokenString)
        return decoded.userid
    }
    remove () {

    }
    //切换当前token
    change (key) {
        if (this.getList().has(key)) {
            window.localStorage.setItem(this.keyToken, key)
        }
    }
    clear () {
        window.localStorage.clear()
    }
}

export default StoragedToken