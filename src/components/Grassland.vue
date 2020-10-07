<template>
    <div class="grassland">
        <notebox/>
    </div>
</template>
<script>
export default {
    components: {
        notebox: () => import('./Notebox')
    }
}
</script>
<style lang="stylus" scoped>
.grassland
    /* Positioning */
    position absolute

    left 0
    
    /* Box model */
    display flex
    flex-direction column
    align-items center
    width 100vw
    margin 8px
    /* Typographic */
    /* Visual */
    /* background #2cffb7 */

    /* Other */

.addition
    margin-top 32px
</style>