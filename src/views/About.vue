<template>
  <div class="about">
    <address>
      <p>
        Developed by fromlili@outlook.com. 
      </p>
      <p>Power by Github and Vuejs.</p>
      <p class="fork-me"><a href="https://github.com/xmoli/qukaoyan">Fork me on Github.</a></p>
    </address>
  </div>
</template>

<style>
.about {
  background: #f1f1f1;
  position: absolute;
  z-index: -1;
  width: 45em;
  padding: 1.25em;
  margin: 8px;
  border: 1px solid #c1c4c8;
  border-radius: 4px;
}
.about .fork-me {
  color: #2a2aee;
  display: inline-block;
  transform: rotate(-8deg);
}
.about a {
  color: inherit;
}

.about p {
  background: white;
  border-radius: 4px;
  padding: 8px;
  box-shadow: 1px 1px 2px -1px;
}
.about address p:first-child {
  transform: rotate(10deg);
}
</style>
