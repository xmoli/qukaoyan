<template>
    <div class="countdown">
        <div class="counter"
            @click="handleOpenSetting"
        >
            <span>
                {{event.prefix}}
            </span>
            <span class="number">
                {{spareDay}}
            </span>
            <span class="unit">
                {{event.suffix}}
            </span>
        </div>
        <my-select 
            :anchor="anchorSelect"
            :options="dateOptions"
            @close="handleCloseSetting"
            @select="handleSelect"
        >
        </my-select>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
    components: {
        'my-select': () => import('./SelectOptions')
    },
    data() {
        return {
            anchorSelect: {event: null, open: false},
        }
    },
    computed: {
        ...mapState(['event']),
        ...mapGetters(['dateOptions','finishDate']),
        endTime() {

            return new Date(this.finishDate).getTime()
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
        handleOpenSetting (event) {
            this.anchorSelect = {event, open: true}
        },
        handleCloseSetting () {
            this.anchorSelect.open = false
        },
        handleSelect (value) {
            let e = this.event
            e.finishDate = value
            this.$store.commit('event', e)  
        }
    },
    created () {
        this.$store.dispatch('getUserEvent')
    }
}
</script>
<style lang="stylus" scoped>
.counter
    /* Box model */
    border-radius 8px
    /* Typograhic */
    font-size 16px
    /* Visual */
    background #00b7ee
    &:hover
        cursor pointer
    .number
        font-size 3em
    span
        margin 8px
</style>
