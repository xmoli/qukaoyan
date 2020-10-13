<template>
    <div class="pager">
        <div v-if="hasPre()" class="icon left"
             @click="decrement"
        >
            <font-awesome-icon icon="backward"/>
        </div>
        <div v-else class="icon disable"></div>
        <form @submit.prevent class="pager-form"
            @click="handleOpenSelect"
        >
        第
        <input placeholder="页码" class="pager-input"
            :value="current"
            @input="handleInput"
            @blur="handleCloseSelect"
            maxlength="4"
        />
        <select-option
            :anchor="anchorSelect" 
            :options="options"
            @close="handleCloseSelect"
            @select="handleSelect"
        />
        页
        </form>
        <div v-if="hasNext()" class="icon right"
            @click="increment"
        >
            <font-awesome-icon icon="forward"/>
        </div>
        <div v-else class="icon disable" ></div>
    </div>
</template>

<script>
import {  mapState, mapActions } from 'vuex'

export default {
    components: {
        'select-option': () => import('./SelectOptions')
    },
    data () {
        return {
            anchorSelect: {event: null, open: false},
            options: 0
        }
    },
    computed: {
        ...mapState({
            maxPage: state => state.pager.maxPage,
            current: state =>state.pager.current
        })
    },
    methods: {
        ...mapActions([
            'increment',
            'decrement',
            'turn'
        ]),
        hasPre() {
            let preIndex = this.current - 1
            if (preIndex > 0 ) {
                return true
            } else {
                return false
            }
        },
        hasNext() {
            let nextIndex = this.current + 1
            if (this.maxPage >= nextIndex) {
                return true
            } else {
                return false
            }
        },
        handleOpenSelect (event) {
            this.anchorSelect = {event ,open: true}
        },
        handleCloseSelect () {
            this.anchorSelect.open = false
        },
        handleSelect (value) {
            this.turn(value)
        },
        handleInput (e) {
            this.turn(e.target.value)
            this.handleCloseSelect()
        }
    },
    created () {
        this.options = this.maxPage
    },
    updated () {
        this.options = this.maxPage
    }
}
</script>

<style lang="stylus">
.pager
    /* Positioning */
    /* Box model */
    display flex
    justify-content center
    align-items center
    padding 8px
    user-select none
.pager-form 
    border 1px solid purple
    border-radius 8px
    border-left none 
    border-right none 
    padding 0 4px
    &:hover
        cursor pointer
.pager-input
    width 2em
    outline none
    margin 8px
    border none
    user-select auto

.icon
    width 2em
    padding 4px
    border 1px solid purple 
    border-radius 8px
    color black
    &:hover
        cursor pointer

.icon.left
    border-right none

.icon.right
    border-left none 
.icon.disable
    border 1px solid purple 
    &:hover
        cursor not-allowed
</style>