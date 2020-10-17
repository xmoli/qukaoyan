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
            v-model="current"
            @blur="handleCloseSelect"
            type="number"
        />
        <select-option
            class="pager-select-option"
            :anchor="anchorSelect" 
            :options="maxPage"
            @close="handleCloseSelect"
            @select="handleSelect"
        />
        / {{maxPage}}
        页
        </form>
        <div class="icon right"
            @click="increment()"
            :class="{disable: !hasNext()}"
        >
            <font-awesome-icon icon="forward"/>
        </div>
    </div>
</template>

<script>
import {  mapState } from 'vuex'

export default {
    components: {
        'select-option': () => import('./SelectOptions')
    },
    data () {
        return {
            anchorSelect: {event: null, open: false},
        }
    },
    computed: {
        ...mapState({
            maxPage: state => state.noteInfo.page,
            currentPage: state => state.noteInfo.current
        }),
        current: {
            get () {
                switch (this.$route.params.page) {
                    case undefined:
                    case 'today':
                        return this.maxPage
                    default:
                        return Number.parseInt(this.$route.params.page)
                }
            },
            set (val) {
                if ((val < 1) && (val> this.maxPage)) {
                    return
                }
                this.$router.push({name: 'Home', params: {page: val}})
            }
        },
    },
    methods: {
        hasPre() {
            if (this.current <= 1) {
                return false
            } else {
                return true
            }
        },
        hasNext() {
            if (this.current >= this.maxPage) {
                return false
            } else {
                return true
            }
        },
        turnToPage (page) {
            if (page === this.current) {
                return
            }
            if ((this.maxPage >= page) && (page > 0)) {
                this.$store.commit('PAGE_CURRENT', page)
                this.$router.push({name: 'Home', params: {page}})
            }
        },
        increment () {
            if ((this.current+1) <= this.maxPage) {
                this.$store.commit('increment')
                this.$router.push({name: 'Home', 
                    params: {page: this.current + 1}})
            }
        },
        decrement () {
            if (this.current > 1) {
                this.$store.commit('decrement')
                this.$router.push({name: 'Home', 
                    params: {page: this.current - 1}})
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
    beforeRouteUpdate(to, from, next) {
        this.current = Number.parseInt(to.params.page)
        next()
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
    width 3.5em
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