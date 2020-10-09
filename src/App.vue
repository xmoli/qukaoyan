<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">计划表</router-link> |
      <router-link to="/about">关于</router-link>
    </div>
    <transition name="scale-fade">
      <router-view/>
    </transition>
  </div>
</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

#nav
  a
    color purple 
</style>
<style>
ul {
    margin: 0;
    padding: 0;
}
ul li {
    list-style: none;
    margin: 0;
    padding: 0;
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
  transform: scaleY(.5);
  opacity: 0;
}
</style>
