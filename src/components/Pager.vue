<template>
    <div class="pager">
        <div class="icon left"
             @click="decrement"
             :class="{disable: !hasPre()}"
        >
            <font-awesome-icon icon="angle-left"/>
        </div>
        <form @submit.prevent="handleCloseSelect" class="pager-form"
            @click.stop="togglePageList"
            :style="{width: current*1.5 + 'em'}"
        >
        <input placeholder="页码" class="pager-input"
            v-model="current"
            @blur="handleCloseSelect"
            :style="{width: current*1+'em'}"
        />
        <select-option
            class="pager-select-option"
            :anchor="anchorSelect" 
            :options="maxPage"
            @close="handleCloseSelect"
            @select="handleSelect"
        />
        </form>
        /
        <div class="last-page">
            {{maxPage}}
        </div>
        <div class="icon right"
            @click="increment()"
            :class="{disable: !hasNext()}"
        >
            <font-awesome-icon icon="angle-right"/>
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
.pager> * {
    margin: 0 4px;
}
.pager-form 
    overflow hidden
    display flex
    align-items center
    justify-content center
    height 1.5em
    min-width 1.8em
    border-radius 4px 
    background white
    &:hover
        cursor pointer

.pager-input
    outline none
    border none 
    user-select auto
    background inhreit 

.icon, .last-page
    width 1.8em
    height 1.5em
    line-height 1.5em;
    border-radius 2px
    color black
    background white
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