<template>
  <div class="about">
    <h1>关于页面</h1>
    <address>
      <p>
        Developed by fromlili@outlook.com. 
      </p>
      <p>Power by Github and Vuejs.</p>
      <a href="https://github.com/xmoli/qukaoyan">Fork me on Github.</a>
    </address>
  </div>
</template>

<style>
.about {
  background: #f1f1f1;
  padding: 1em;
}
.about a {
  color: #2a2aee;
  display: inline-block;
  transform: rotate(-15deg);
}
.about address {
  margin: 3.75em
}
.about address p:first-child {
  transform: rotate(10deg);
}
</style>
