<template>
    <div class="pager">
        <div :class="['pager-item',i.status]"
            v-for="i in pager" :key="i"
        >
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    computed: {
        ...mapState(['pager'])
    }
}
</script>

<style lang="stylus">
.pager
    /* Positioning */
    position absolute 
    z-index 2000
    right 10px
    top 0
    /* Box model */
    display flex
    flex-direction column
    justify-content center
    height 100vh

.pager-item
    width 8px
    height @width 
    border-radius @width
    margin 4px 0
    border 2px solid rgba(0,0,0, .1)
    background rgba(0,0,0,0.4)
    &:hover
        cursor pointer
    &.active
        height 1em
        border 2px solid rgba(0,0,0,.4)
        background rgba(0,0,0,0.6)

</style>