<template>
    <div class="counter"
        @contextmenu.prevent="handleOpenMenu"
    >
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
            descript: '剩余',
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
        },
        handleOpenMenu() {
            console.log('openMenu')
        }
    }
}
</script>
<style lang="stylus" scoped>
.counter
    /* Box model */
    margin-bottom 16px
    border-radius 8px
    /* Typograhic */
    font-size 16px
    /* Visual */
    background #00b7ee
    .number
        font-size 3em
    span
        margin 8px
</style>
