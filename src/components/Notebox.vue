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
                        tabindex="0"
                    >
                    <font-awesome-icon  icon="times"/>
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
            todo: state => state.todo
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
        /**
         * 事件标记handler
         */
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

        //显示关闭icon
        times (index) {
            if (this.readonly !== true) {
                return (this.focus === index) || 
                        (this.hover === index)
            }
        },
        updateTask(event,index) {
            let data = {
                task: event.target.value,
                rate: this.$store.state.todo[index].rate
            }
            this.$store.commit('TODO_UPDATE', {data, index})
            this.autoAddTask()
        },
        autoAddTask () {
            if (this.readonly === false) {
                if ( this.todo.length === 0) {
                    this.$store.commit('TODO_ADD')
                    return
                }
                if (this.todo[this.todo.length -1].task !== '') {
                    this.$store.commit('TODO_ADD')
                    return 
                }
            }
        },
        removeTask (index) {
            let  i = this.todo.length - 1
            if (i === index) {
                return
            }
            this.$store.commit('TODO_REMOVE', index)
        },
        updateRate(event, index) {
            if (this.readonly === false) {
                let data = {
                    task: this.$store.state.todo[index].task,
                    rate: event.rate
                }
                this.$store.commit('TODO_UPDATE',{data, index})
                this.autoAddTask()
            }
        },
        save () {
            if (this.needSync) {
                this.$store.dispatch('saveNoteToday')
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
    updated () {
        this.autoAddTask()
        this.autoSave(10)//10秒自动保存
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
    width 45em
    margin-top 8px
    border-radius 4px
    user-select none
    border: 1px solid #c1c4c8;
.notebox-wrapper> .countdown
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
    border 1.25em solid transparent
    outline none

    letter-spacing .2ch

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
    width: 1.25em;
    height: 1.25em;
}
@media screen and (max-width: 900px) {
.notebox-wrapper {
    width: 100vw;
    border: none;
}
.notebox-wrapper > .countdown {
    margin-top: 0;
}
.task {
    border: 1.25rem solid transparent;
}
}
</style>