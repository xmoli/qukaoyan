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
    top: 0;
    left: 0;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

.pop-board {
    padding: 1em;
    border-radius: 4px;
    box-shadow: 4px 4px 20px -5px;
    backdrop-filter: saturate(180%) blur(20px);
    background: transparent;
}
.pop-board:hover {
    cursor: default;
}
</style>