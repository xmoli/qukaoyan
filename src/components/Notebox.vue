<template>
    <div class="notebox-wrapper">
    <table  class="notebox">
        <tr>
            <th>index</th>
            <th>任务内容</th>
            <th>预计时间</th>
            <th>开始</th>
            <th>评价</th>
        </tr>
        <tr class="notebox-item"
            v-for="(item,index) in todos" :key="index"
        >
            <td>
                {{index+1}}、
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
        pager: () => import('./Pager')
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
        border 1px solid #007bea 
        line-height 3em
        border-left none 
        border-right none
th
    font-weight normal 
    color grey
input.task
    border none
    outline none
    width 100%

.item-status
    color green

.start-icon
    color gray
    transform color .5s ease-out
    &:hover
        cursor pointer
        color black
</style>