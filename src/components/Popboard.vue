<template>
    <div v-if="open" class="full-wrapper"
        @click="handleClose"
    >
        <form class="pop-board" 
            @submit.prevent="handleSubmit"
            @click.stop
        >
            <slot/>
        </form>
    </div>
</template>

<script>
export default {
    props: {
        open: Boolean
    },
    methods: {
        handleSubmit () {
            this.$emit('submit')
            this.handleClose()
        },
        handleClose () {
            this.$emit('close')
        }
    }
}
</script>

<style>
.full-wrapper {
    position: fixed;
    top: 0;bottom: 0;
    left: 0;right: 0;

    display: flex;
    justify-content: center;
    align-items: center;
}

.pop-board {
    padding: 1em;
    border-radius: 4px;
    box-shadow: 4px 4px 20px -5px;
    background: hsla(0, 0%, 100%,.3);
    backdrop-filter: saturate(180%) blur(10px);
}
.pop-board:hover {
    cursor: default;
}
</style>