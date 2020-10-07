<template>
    <form>
        <input class="task-addition" placeholder="添加任务..."/>
        <button class="submit">
            <font-awesome-icon icon="plus"/>
        </button>
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

<style lang="stylus" >
.task-addition, .submit
    /* Box model */
    border none
    height 2em
    padding 8px
    margin 0 8px
    /* Visual */
    background transparent
    border-bottom 1px solid rgba(0,0,0,.2)

    /* Other */
    outline none 

.task-addition
    width 360px

.submit
    box-sizing content-box
    &:hover
        cursor pointer


</style>