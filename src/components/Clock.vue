<template>
    <div class="clock">
        <span class="descript">
            现在时间是
        </span>
       <span class="hours">
           {{hours}}
       </span>
       <span class="descript">
           时
       </span>
       <span class="sperate">
           {{sperate}}
       </span>
       <transition name="roll">
            <span class="mintues" v-if="seconds">
                {{minutes}}
            </span>
       </transition>
       <span class="descript">
           分
       </span>
    </div>
</template>
<script>
export default {
    data () {
        return {
            hours: 0,
            minutes: 0,
            seconds: 0
        }
    },
    computed: {
        sperate() {
            if ((this.seconds % 2) == 0) {
                return ':'
            }else {
                return ""
            }
        }
    },
    methods: {
        freshDate() {
            let _fresh = new Date()

            this.hours = _fresh.getHours()
            if (this.hours < 10) {//toString
                this.hours = '0' + this.hours
            }

            this.minutes = _fresh.getMinutes()
            if (this.minutes < 10) {//toString
                this.minutes = '0' + this.minutes
            }
            this.seconds = _fresh.getSeconds()
        },
    },
    created() {
        this.freshDate()
        setInterval(this.freshDate, 1000)
    }
}
</script>

<style lang="stylus" scoped>
.clock
    /* Box model */
    padding 32px
    /* Typographic */
    font-family 'Times New Roman', Times, serif
    font-size 32px
    
    .descript
        font-size 16px
    .sperate
        display inline-block
        width 8px
</style>