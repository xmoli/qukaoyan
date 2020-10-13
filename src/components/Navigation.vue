<template>
    <ul class="nav">
        <router-link tag="li" to="/">计划表</router-link>
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
    height: 3.75em;
    font-size: 1.2em;
    box-shadow: 2px 2px 10px -8px;
    margin-bottom: 1em;
}
ul.nav li {
    margin: 1em;
    display: inline;
}
.nav a {
    color: purple;
}

.router-link-active {
    color: #2a2aee
}
</style>
