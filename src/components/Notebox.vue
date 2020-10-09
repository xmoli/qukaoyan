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
                <form @submit.prevent="putTask($event, index)">
                    <input class="task"
                        placeholder="填写任务"
                        :value="item.task"
                        @input="updateTask($event, index)"
                        maxlength="30"
                    />
                </form>
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
        updateTask(event,index) {
            this.$store.commit('updateTask',{index, task: event.target.value})
            this.checkNewTask()
        },
        checkNewTask () {
            if (this.todos.length === 0) {
                this.$store.commit('addTask')
                return
            }
            let last = this.todos[this.todos.length-1]
            if (last.task) {
                this.$store.commit('addTask')
            }
            for (let i = 0; i < this.todos.length-1; i ++ ) {//除了最后一个，其他为空白的话删除
                if (this.todos[i].task == '') {
                    this.$store.commit('removeTask', i)
                }
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.notebox-wrapper
    padding 3em 2em
    border 6px solid purple
    border-left none 
    border-right none
    border-radius 10px
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