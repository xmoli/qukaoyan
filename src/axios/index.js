import axios from './config'

if (process.env.NODE_ENV === 'development') {
    import('../mock')
    console.log('开启mock')
}

export default axios