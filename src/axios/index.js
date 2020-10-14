import {axios , mock} from '@/mock'

if (process.env.NODE_ENV === 'production') {
    mock.restore();
}
export default axios