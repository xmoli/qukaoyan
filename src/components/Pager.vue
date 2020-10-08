<template>
    <div class="pager">
        <div v-if="hasPre()" class="icon"
             @click="decrement"
        >
            <font-awesome-icon icon="backward"/>
        </div>
        <div v-else class="icon"></div>
        第
        <input placeholder="页码" class="pager-input"
            v-model="current"
            maxlength="4"
        />
        页
        <div v-if="hasNext()" class="icon"
            @click="increment"
        >
            <font-awesome-icon class="icon" icon="forward"/>
        </div>
        <div v-else class="icon" ></div>
    </div>
</template>

<script>
import {  mapState, mapMutations } from 'vuex'

export default {
    computed: {
        ...mapState({
            maxPage: state => state.pager.maxPage,
        }),
        current: {
            get () {
                return this.$store.state.pager.current
            },
            set (value) {
                this.$store.commit('turn', value)
            }
        }
    },
    methods: {
        ...mapMutations([
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
        }
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

.pager-input
    width 2em
    outline none
    margin 8px
    border none

.icon
    width 2em
    color gray
    &:hover
        cursor pointer
        color black
</style>