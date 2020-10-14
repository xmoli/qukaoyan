<template>
    <div class="loadding"
        v-if="open"
        :style="{width: progress + 'vw'}"
    >
    </div>
</template>
<script>
export default {
    props: {
        open:{
            type: Boolean,
            default: false
        },
        progress: {
            type: Number,
            default: 0
        }
    }
}
</script>
<style scoped>
.loadding {
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    height: 1px;
    transform: scale(0.5);
    background: #67C23A;
}
</style>
