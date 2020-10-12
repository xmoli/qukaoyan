<template>
    <div class="notebox-wrapper">
        <counter />
        <transition-group name="scale-fade" tag="table" class="notebox">
            <tr class="notebox-item"
                v-for="(item,index) in todos" :key="item.key"
            >
                <td>
                    <input class="task"
                        placeholder="填写任务"
                        :value="item.task"
                        @input="updateTask($event, index)"
                        @blur="checkBlank(index)"
                        maxlength="30"
                    />
                </td>
                <td>
                    <rate-plate :value="item.rate" @input="updateRate($event, index)"/>
                </td>
            </tr>
        </transition-group>
        <pager/>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    components: {
        pager: () => import('./Pager'),
        counter: () => import('./Countdown'),
        'rate-plate': () => import('./RatePlate')
    },
    computed: {
        ...mapState({
            todos: (state) => state.todos,
            needSync: (state) => state.needSync
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
        },
        checkBlank (index) {
            if (this.todos[index].task == '') {
                this.$store.commit('removeTask', index)
            }
        },
        updateRate(event, index) {
            this.$store.commit('updateRate', {index, rate: event.rate})
        },
        save () {
            if (this.needSync) {
                this.$store.dispatch('saveNoteToday', this.todos)
            }
        },
        autoSave (second) {
            setInterval(this.save, second*1000)
        }
    },
    created () {
        this.autoSave(5)//5秒自动保存
    },
    mounted () {
        addEventListener('beforunload', this.save)
        addEventListener('unload', this.save)
    },
    destroyed () {
        removeEventListener('beforeunload', this.save)
        removeEventListener('unload', this.save)
    }
}
</script>

<style lang="stylus" scoped>
.notebox-wrapper
    padding 2em
    padding-bottom 3em
    border 6px solid purple
    border-left none 
    border-right none
    border-radius 10px
    width 580px
    user-select none
.notebox-wrapper> div 
    margin-bottom 2em
table.notebox 
    border-collapse collapse
    width 100%
    td, th
        line-height 3em
        border-left none 
        border-right none
.notebox th
    font-weight normal 
    color grey
    
.task
    border none
    border-bottom 2px solid #00b7ee
    outline none
    width 100%
    user-select auto


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