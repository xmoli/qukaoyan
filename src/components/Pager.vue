<template>
    <div class="pager">
        <div class="icon left"
             @click="decrement"
             :class="{disable: !hasPre()}"
        >
            <font-awesome-icon icon="backward"/>
        </div>
        <form @submit.prevent="handleCloseSelect" class="pager-form"
            @click.stop="togglePageList"
        >
        第
        <input placeholder="页码" class="pager-input"
            :value="current"
            @input="handleInput"
            @blur="handleCloseSelect"
            maxlength="4"
            type="number"
        />
        <select-option
            class="pager-select-option"
            :anchor="anchorSelect" 
            :options="options"
            @close="handleCloseSelect"
            @select="handleSelect"
        />
        页
        </form>
        <div class="icon right"
            @click="increment"
            :class="{disable: !hasNext()}"
        >
            <font-awesome-icon icon="forward"/>
        </div>
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
            'turnToPage'
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
        togglePageList (event) {
            this.anchorSelect = {event ,open: !this.anchorSelect.open}
        },
        handleCloseSelect () {
            this.anchorSelect.open = false
        },
        handleSelect (value) {
            this.turnToPage(value)
        },
        handleInput (e) {
            this.turnToPage(e.target.value)
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
    user-select none
.pager-form 
    border-radius 8px
    border-left none 
    border-right none 
    padding 0 4px
    &:hover
        cursor pointer
.pager-input
    width 2em
    outline none
    margin-left 4px
    padding 4px
    border-radius 4px
    border none 
    box-shadow 0 0 8px -4px inset
    user-select auto

.icon
    width 2em
    padding 8px
    border-radius 4px
    color black
    &:hover
        cursor pointer

.icon.disable
    color gray
    &:hover
        cursor not-allowed

.pager-select-option {
    transform: translateX(1em)
}
</style>