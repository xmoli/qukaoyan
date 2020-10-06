<template>
    <form>
        <input class="task-addition" placeholder="添加任务..."/>
        <rating/>
    </form>
</template>

<script>
export default {
    components: {
        rating: () => import('./RatePlate')
    }
}
</script>

<style lang="stylus">
.task-addition
    /* Box model */
    border-radius 10px
    border 2px solid #34e8ab
    width 360px
    height 2em
    padding 8px

    /* Visual */
    background #20d497

    /* Other */
    outline none 
</style>