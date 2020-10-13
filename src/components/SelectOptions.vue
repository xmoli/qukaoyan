<template>
    <transition name="slide-fade">
    <div class="select-options"
        v-if="open"
        :style="{left: x + 'px', top: y + 'px'}"
    >
        <ul>
            <li v-for="(item,index) in options" :key="index"
                @click="handleSelect($event, item)"
            >
                {{item}}
            </li>
        </ul>
    </div>
    </transition>
</template>
<script>
export default {
    props: ['anchor','options'],
    computed: {
        open () {
            if (typeof(this.anchor.open) !== 'boolean') {//类型检查
                return false
            }
            return this.anchor.open
        },
        x () {
            return this.anchor.event.clientX
        },
        y () {
            return this.anchor.event.clientY
        }
    },
    watch: {
        open (val) {
            if (val === true) {
                this.listenClose()
            } else {
                this.listenClose()
            }
        }
    },
    methods: {
        handleSelect (event, value) {
            this.$emit('select', value)
            this.closeSelect()
        },
        listenClose () {
            window.onscroll = () => {
                this.closeSelect()
            }
            window.onresize = () => {
                this.closeSelect()
            }
            document.addEventListener('click', this.closeSelect, true)
        },
        closeSelect () {
            document.removeEventListener('click', this.closeSelect, true)
            this.$emit('close')
        }
    }
}
</script>

<style>
.select-options {
    /* Positioning */
    position: fixed;
    /* Box model */
    max-height: 6em;
    min-width: 3em;
    border: 6px solid #6300be;
    border-radius: 8px;
    border-left: none;
    border-right: none;
    padding: 2px 8px;
    /* Visual */
    backdrop-filter: saturate(180%) blur(20px);

    box-shadow: 0 0 10px -5px;
    overflow: auto;
}
.select-options ul {
    margin: 0;
    padding: 0;
}
.select-options ul li {
    line-height: 1.5em;
    width: 100%;
    list-style: none;

}
.select-options ul li:hover{
    background: rgba(0,183,238,.5);
    cursor: pointer;
}

.slide-fade-enter-active {
    transition: all .3s ease-in;
}
.slide-fade-leave-active {
    transition: all .3s ease-in;
}
.slide-fade-enter, .slide-fade-leave-to{
    transform: rotate3d(1,0,0,60deg);
    opacity: 0;
}
</style>