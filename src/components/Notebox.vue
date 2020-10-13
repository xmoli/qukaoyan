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
                        maxlength="50"
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
    border-left none 
    border-right none
    border-radius 10px
    width 780px
    box-shadow 2px 2px 10px -5px
    background #efefef
    user-select none
.notebox-wrapper> div 
    margin 1em 0
table.notebox
    border-spacing 0 1em
    width 100%
    td 
        background white

table.notebox tr td:first-child
    border-radius 4px 0 0 4px

table.notebox tr td:last-child
    border-radius 0 4px 4px 0
    
.task
    border 1em solid transparent
    outline none
    width 100%
    background inherit
    user-select auto

p.descript {
    position: absolute;
    background: yellow;
    backdrop-filter: saturate(180%) blur(20px);
    padding: 8px;
    border-radius: 4px;
    margin:0;
}

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