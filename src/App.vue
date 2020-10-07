<template>
  <div id="app">
    <skybox/>
    <grassland/>
  </div>
</template>
<script>
export default {
  components: {
    skybox: () => import('@/components/Skybox'),
    grassland: () => import('@/components/Grassland')
  }
}
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50


body
  margin 0
  paddign 0
</style>
