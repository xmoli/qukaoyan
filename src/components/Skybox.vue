<template>
    <div class="skybox">
        <div class="clock-wrapper">
            <clock/>
            <counter/>
        </div>
        <notebox/>
    </div>
</template>
<script>
export default {
    components: {
        clock: () => import('./Clock'),
        counter: () => import('./Countdown'),
        notebox: () => import('./Notebox')
    }
}
</script>
<style lang="stylus" scoped>
.skybox
    /* Positioning */
    position absolute
    left 0
    top 0
    
    /* Box model */
    display flex
    flex-direction column
    align-items center
    width 100vw
    height 50vh

    /* Typographic */
    /* Visual */
    background #00b7ee

    /* Other */

.clock-wrapper
    display flex
    flex-direction row
    align-items center

</style>