<template>
    <div class="notebox">
        <div class="notebox-item"
            v-for="(item,index) in todos" :key="index"
        >
            <span class="notebox-item-start-time">{{item.startTime}}</span>
            <span class="notebox-item-task">{{item.task}}</span>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            todos: (state) => state.todos
        })
    }
}
</script>

<style lang="stylus">
.notebox
    /* Positioning */
    /* Box model */
    display flex
    flex-direction column
    align-items flex-start
    width 400px
    height 12em
    
    /* Visual */

.notebox-item
    color white

    .notebox-item-start-time, .notebox-item-task
        display inline-block
        padding 8px
    .notebox-item-start-time
        margin 8px
        border-right none 

    .notebox-item-task
        min-width 5em
        background rgba(255,255,255,.2)
        transform translateX(-.5em)
        border-radius 0 10px 10px 0
</style>