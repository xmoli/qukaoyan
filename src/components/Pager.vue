<template>
    <div class="pager">
        第
        <input placeholder="页码" class="pager-input"
            v-model="pager.current"
        />
        页
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
    /* Box model */
    display flex
    justify-content center
    align-items center

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

input.pager-input
    width 2em
    outline none
    margin 8px
    border none

</style>