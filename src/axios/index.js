let axios

if (process.env.NODE_ENV === 'development') {
    axios = () => import('../mock')
    console.log('开启mock')
} else {
    axios = () => import('./config')
}

export default axios