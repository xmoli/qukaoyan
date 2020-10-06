import {mount} from '@vue/test-utils'
import Countdown from '@/components/Countdown'

describe('Countdown.vue', () => {
    const currentTimestamp = new Date().getTime(),
        aDay = 25*60*60*1000

    it('endDate 为明天', () => {
        const endDate = currentTimestamp + aDay
        console.log(new Date(endDate))
        const wrapper = mount(Countdown, {
            data() {
                return {
                    endDate: new Date(endDate)
                }
            }
        })
        expect(wrapper.text()).toMatch(/1/)
    })
    it('endDate 为今天', () => {
        const endDate = currentTimestamp - aDay
        
        const wrapper = mount(Countdown, {
            data() {
                return {
                    endDate
                }
            }
        })
        expect(wrapper.text()).toMatch('0')
    })
    it('endDate 为昨天', () => {
        const endDate = currentTimestamp
        
        const wrapper = mount(Countdown, {
            data() {
                return {
                    endDate
                }
            }
        })
        expect(wrapper.text()).toMatch(/0/)
    })
})