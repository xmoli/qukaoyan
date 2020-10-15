<template>
    <ul class="nav">
        <router-link tag="li" to="/todo-list/current">计划表</router-link>
        <router-link tag="li" to="/user">用户</router-link>
        <router-link tag="li" to="/about">关于</router-link>
    </ul>
</template>
<script>

</script>

<style>
ul.nav {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.7em;
    font-size: 1.1em;
    box-shadow: 2px 2px 10px -8px;
}
ul.nav li {
    margin: 1em;
    display: inline;
}
.nav a {
    color: purple;
}

.router-link-exact-active.router-link-active {
    color: #2a2aee
}
</style>
