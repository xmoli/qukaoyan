<template>
    <div class="notebox-wrapper">
        <counter />
        <transition-group name="scale-fade" tag="table" class="notebox">
            <tr class="notebox-item"
                v-for="(item,index) in todo" :key="item.key"
            >
                <td>
                    <input class="task"
                        placeholder="填写任务"
                        :value="item.task"
                        @input="updateTask($event, index)"
                        @blur="checkBlank(index)"
                        maxlength="80"
                        type="text"
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
import { mapState, mapActions} from 'vuex'

export default {
    components: {
        pager: () => import('./Pager'),
        counter: () => import('./Countdown'),
        'rate-plate': () => import('./RatePlate')
    },
    computed: {
        ...mapState({
            needSync: (state) => state.needSync,
            todo: (state) => {
                try {
                    return state.note[this.$store.noteInfo.current].todo
                }catch {
                    return
                }
            }
        }),
    },
    methods: {
        ...mapActions([
            'getNoteToday',
            'getNote'
        ]),
        updateTask(event,index) {
            this.$store.commit('updateTask',{index, task: event.target.value})
            try {
                this.addBlankTask()
            } catch {
                return
            }
        },
        addBlankTask () {
            if (this.todo.length === 0) {
                this.$store.commit('addTask')
            } else {
                let last = this.todo[this.todos.length-1]
                if (last.task.length > 0) {
                    this.$store.commit('addTask')
                } else {
                    throw `Task have been added`
                }
            }
        },
        checkBlank (index) {
            if ((this.todos[index].task === '') && (this.todos.length > 1)) {
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
        },
        getPage () {
            switch (this.$route.params.page) {
                case 'today':
                this.getNoteToday()
                this.$store.commit('PAGE_CURRENT', this.page)
                break
                default:
                this.$store.commit('PAGE_CURRENT', this.$route.params.page)
                this.getNote(this.$route.params.page)
                break
            }
        }
    },
    created () {
        this.autoSave(5)//5秒自动保存
        this.getPage()
        try {
            this.addBlanckTask()
        } catch (err){
            return
        }
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
    position: absolute;
    padding 1em
    padding-bottom 2em
    border-left none 
    border-right none
    border-radius 5px
    width 40em
    user-select none
.notebox-wrapper> div 
    margin 1em 0
table.notebox
    table-layout: fixed;
    border-spacing 0 1em
    width 100%
    td 
        background white

table.notebox tr td:first-child
    border-radius 4px 0 0 4px

table.notebox tr td:last-child
    border-radius 0 4px 4px 0
    
.task
    display: block;
    width: 100%;
    border 1em solid transparent
    outline none
    background inherit
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


@media screen and (max-width: 900px) {
.notebox-wrapper {
    width: 100vw;
    box-sizing: border-box;
}
}
</style>