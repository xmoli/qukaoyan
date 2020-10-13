<template>
    <div class="tips" v-if="active">
        {{value}}
    </div>
</template>
<script>
export default {
    props: {
        value: {
            type: String,
            default: 'Tips！'
        },
        anchor: {
            type: Object
        }
    },
    data () {
        return {
            timeout,
            active
        }
    },
    methods: {
        setTimer (second) {
            this.timeout = setTimeout(function(){
                this.active = true
            },
            second*1000)
        },
        clearTimer () {
            clearTimeout(this.timeout)
            this.active = false
        }
    }
}
</script>
<style>
.tips {
    box-shadow: 2px 2px 10px -8px;
    background: yellow;
    padding: 8px;
    max-width: 50vh;
    max-width: 50vw;
}
</style>