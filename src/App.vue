<template>
  <div id="app">
    <loading :value="loading"/>
    <header>
      <user-nav />
    </header>
    <main>
      <transition name="scale-fade">
        <router-view/>
      </transition>
    </main>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    "loading": () => import('@/components/Loading'),
    "user-nav": () => import('@/components/Navigation')
  },
  computed: mapState(['loading']),
  methods: {
    ...mapActions(['tokenTest'])
  },
  created () {
    this.tokenTest()
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
  
* {
  box-sizing: border-box;
}
html {
  font-size: 16px;
}
body {
  margin: 0;
  padding: 0;
  background: #f1f1f1;
  font-size: 1rem;
}
ul, li {
    margin: 0;
    padding: 0;
}
dl, dt, dd {
    margin: 0;
}
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

<style>
@media screen and (max-width: 900px) {
  html {
    font-size: 14px;
  }
}

</style>

<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.scale-fade-enter-active {
  transition: all .3s ease-in;
}
.scale-fade-leave-active {
  transition: all .3s ease-out;
}
.scale-fade-enter, .scale-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: scaleX(0.5);
  opacity: 0;
}
</style>
