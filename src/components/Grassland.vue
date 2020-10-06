<template>
    <div class="grassland">
        <addition class="addition"/>
    </div>
</template>
<script>
export default {
    components: {
        
        addition: () => import('./TaskAdder')
    }
}
</script>
<style lang="stylus" scoped>
.grassland
    /* Positioning */
    position absolute
    top 50vh
    left 0
    
    /* Box model */
    display flex
    flex-direction column
    width 100vw
    height 50vh

    /* Typographic */
    /* Visual */
    background #2cffb7

    /* Other */

.addition
    margin-top 32px
</style>