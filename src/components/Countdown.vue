<template>
    <div class="counter">
        <span>
            {{descript}}
        </span>
        <span class="number">
            {{spareDay}}
        </span>
        <span class="unit">
            {{unit}}
        </span>
    </div>
</template>
<script>
export default {
    data() {
        return {
            endDate: '2020-10-03',
            descript: '距离XX剩余',
            unit: '天'
        }
    },
    computed: {
        endTime() {
            return new Date(this.endDate).getTime()
        },
        spareDay() {//负数和零返回0
            let currentTime = new Date().getTime()
            if (this.endTime <= currentTime) {
                return 0
            }
            let duration = this.endTime - currentTime
            return Math.floor(duration/(24*60*60*1000))
        }
    },
    methods: {
        clearStorage() {
            localStorage.removeItem('endDate')
        },
        getEndDate() {
            this.endDate = localStorage.getItem('endDate')
        },
        setEndDate(endDate) {//endDate : timeString
            let dateTest = new Date(endDate).toString()
            if (dateTest !== 'Invalid Date') {
                localStorage.setItem('endDate',endDate)
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.counter
    /* Box model */
    margin 1.5em 0

    /* Typograhic */
    font-size 16px
    text-align center
    .number
        font-size 82px
</style>
