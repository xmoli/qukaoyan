<template>
<div class="user-center">
    <user-info/>
    <user-select/>
    <user-sync/>
</div>
</template>

<script>
export default {
    components: {
        'user-sync': () => import('@/components/UserSync'),
        'user-info': () => import('@/components/UserInfo'),
        'user-select': () => import('@/components/UserSelect')
    },
    created () {
        this.$store.dispatch('getUserInfo')
    },
}
</script>

<style scoped>
.user-center {
    position: absolute;
    margin-top: 1em;
    padding: 1em;
    width: 40em;
    max-width: 980px;
}
.user-center > * {
    margin: 1em 0;
    border: 1px solid  #c1c4c8;
    border-radius: 4px;
    overflow: hidden;
}

@media screen and (max-width: 900px) {

.user-center {
    box-sizing: border-box;
    width: 100vw;
}
}
</style>