<template>
    <div class="notebox-wrapper">
        <counter />
        <transition-group name="scale-fade" tag="table" class="notebox" v-if="todo">
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
                        :readonly="readonly"
                    />
                </td>
                <td>
                    <rate-plate :value="item.rate" @input="updateRate($event, index)"/>
                </td>
            </tr>
        </transition-group>
        <transition name="scale-fade" v-else>
            loading
        </transition>
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
    data () {
        return {
            todo: []
        }
    },
    computed: {
        ...mapState({
            needSync: (state) => state.needSync,
            current: (state) => state.noteInfo.current,
            page: state => state.noteInfo.page,
            note: state => state.note,
        }),
        readonly () {
            if (this.page !== this.current) {
                return 'readonly'
            } else {
                return false
            }
        }
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
                console.info('function updateTadk:','cannot add task')
                return
            }
        },
        addBlankTask () {
            if (this.readonly === 'readonly') {
                return
            }
            if (this.todo === undefined) {
                return
            }
            if (this.todo.length === 0) {
                this.$store.commit('addTask')
            } else {
                let last = this.todo[this.todo.length-1]
                if ((last === undefined) ||
                    (last.task.length > 0)
                ) {
                    this.$store.commit('addTask')
                }
            }
        },
        checkBlank (index) {
            if ((this.todo[index].task === '') && (this.todo.length > 1)) {
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
    beforeCreate () {
        addEventListener('beforunload', this.save)
        addEventListener('unload', this.save)
    },
    created () {
        this.todo = this.note[this.current - 1].todo
    },
    beforeRouteUpdate (to, from, next) {
        switch (to.params.page) {
            case 'today':
                this.todo = this.note[this.page - 1].todo
                break
            default :
                this.todo = this.note[this.$route.params.page*1 - 1].todo
        }
        next()
    },
    mounted () {
        this.autoSave(5)//5秒自动保存
        try {
            this.addBlankTask()
        } catch (err){
            console.info(err)
            return
        }
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