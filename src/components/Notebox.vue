<template>
    <div class="notebox-wrapper">
        <counter />
    <table  class="notebox">
        <tr class="notebox-item"
            v-for="(item,index) in todos" :key="index"
        >
            <td>
                
            </td>
            <td>
                <input class="task"
                    placeholder="填写任务"
                    v-model="item.task"
                    maxlength="30"
                />
            </td>
            <td></td>
            <td v-if="item.startTime">
                {{item.startTime}}
            </td>
            <td v-else class="start-icon">
                <font-awesome-icon icon="play" />
            </td>
            <td>

            </td>
        </tr>
    </table>
        <pager/>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    components: {
        pager: () => import('./Pager'),
        counter: () => import('./Countdown')
    },
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            todos: (state) => state.todos
        })
    },
    methods: {
        randomColor () {

        }
    }
}
</script>

<style lang="stylus" scoped>
.notebox-wrapper
    padding 3em 2em
    box-shadow 1px 1px 8px
    border-radius 0 10px 10px 0
    width 580px
table 
    border-collapse collapse
    width 100%
    td, th
        line-height 3em
        border-left none 
        border-right none
th
    font-weight normal 
    color grey
.task
    border none
    border-bottom 2px solid #00b7ee
    outline none
    width 100%


.item-status
    color green

.start-icon
    color #c403c4
    transform color .5s ease-out
    &:hover
        cursor pointer
        color purple
        transition all .4s ease-in
</style>