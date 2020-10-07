<template>
    <div class="skybox">
        <counter/>
    </div>
</template>
<script>
export default {
    components: {
        counter: () => import('./Countdown')
    }
}
</script>
<style lang="stylus" scoped>
.skybox
    /* Positioning */
    left 0
    top 0
    
    /* Box model */
    display flex
    flex-direction column
    align-items center
    width 100vw

    /* Typographic */
    /* Visual */

    /* Other */

</style>