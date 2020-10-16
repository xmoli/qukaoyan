<template>
    <div class="notebox-wrapper">
        <counter />
        <transition-group name="scale-fade" tag="table" class="notebox" v-if="todo">
            <tr class="notebox-item"
                v-for="(item,index) in todo" :key="item.key.toString()"
                @mouseover="handleItemHover(index)"
                @mouseout="handleItemOut"
            >
                <td>
                    <input class="task"
                        placeholder="填写任务"
                        :value="item.task"
                        @input="updateTask($event, index)"
                        @focus="handleInputFocus(index)"
                        @blur="handleInputBlur"
                        maxlength="80"
                        type="text"
                        :readonly="readonly"
                    />
                </td>
                <td>
                    <rate-plate :value="item.rate" @input="updateRate($event, index)"/>
                </td>
                <td>
                    <div class="toolIcon"
                        @click="removeTask(index)"
                        v-if="times(index)"
                    >
                    <font-awesome-icon  
                        tabindex="0"
                        class="toolIcon" icon="times"
                    />
                    </div>
                    <div v-else class="toolIcon"></div>
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
            todo: [],
            check: false,
            focus: -1,
            hover: -1
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
            if (this.page !== Number.parseInt(this.current)) {
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
        handleInputFocus (index) {
            if (this.readonly === false) {
                this.focus = index
            }
        },
        handleInputBlur () {
            if (this.readonly === false) {
                this.focus = -1
            }
        },
        handleItemHover (index) {
            if (this.readonly === false) {
                this.hover = index
            }
        },
        handleItemOut () {
            if (this.readonly === false) {
                this.hover = -1
            }
        },
        times (index) {
            if (this.readonly !== true) {
                return (this.focus === index) || 
                        (this.hover === index)
            }
        },
        updateTask(event,index) {
            this.todo[index].task = event.target.value
            this.autoAddTask()
        },
        autoAddTask () {
            if (this.readonly === false) {
                let task = {key: new Date() ,task: '',rate: 0}
                if ( this.todo.length === 0) {
                    console.log('blank, new task')
                    this.todo.push(task)
                }
                if (this.todo[this.todo.length -1].task !== '') {
                    console.log('new task')
                    this.todo.push(task)
                }
            }
        },
        removeTask (index) {
            let  i = this.todo.length - 1
            if (i === index) {
                return
            }
            this.todo.splice(index, 1)
        },
        updateRate(event, index) {
            this.todo[index].rate = event.rate
            this.autoAddTask()
        },
        save () {
            if (this.needSync) {
                this.$store.dispatch('saveNoteToday', this.todo)
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
        this.todo = this.note[this.current - 1].todo.slice()
        this.autoAddTask()
    },
    beforeRouteUpdate (to, from, next) {
        this.save()
        switch (to.params.page) {
            case 'today':
                this.todo = this.note[this.page - 1].todo.slice()
                break
            default :
                this.todo = this.note[this.$route.params.page*1 - 1].todo.slice()
                break
        }
        next()
    },
    mounted () {
        this.autoSave(5)//5秒自动保存
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
.toolIcon {
    width: 1em;
    height: 1em;
    border: 2px solid transparent;
}
@media screen and (max-width: 900px) {
.notebox-wrapper {
    width: 100vw;
    box-sizing: border-box;
}
}
</style>