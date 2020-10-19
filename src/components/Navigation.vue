<template>
    <ul class="nav">
        <router-link tag="li" :to="'/todo-list/' + current">计划表</router-link>
        <router-link tag="li" to="/user">用户</router-link>
        <router-link tag="li" to="/about">关于</router-link>
    </ul>
</template>
<script>
export default {
    computed: {
        current () {
            let cur = this.$store.state.noteInfo.current
            if (cur === 0) {
                return 'today'
            } else {
                return cur
            }
        }
    }
}
</script>

<style>
ul.nav {
    position: sticky;
    top: 3.7rem;
    z-index: 10;
    
    display: flex;
    justify-content: center;
    align-items: center;
    height: 3.7em;
    font-size: 1.1em;
    box-shadow: 2px 2px 10px -8px;
}
ul.nav li {
    display: inline-block;
    margin: 1em;
    height: 3.75em;
    line-height: 3.75em
}

ul.nav li:hover {
    cursor: pointer;
}

.nav a {
    color: purple;
}

.router-link-active {
    position: relative;
    color: #2a2aff;
    border-bottom: 2px solid #2a2aff;
}
</style>
