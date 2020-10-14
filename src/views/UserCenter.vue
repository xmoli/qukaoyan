<template>
<div class="user-center">
    <user-sync/>
    <user-info/>
    <user-select/>
</div>
</template>

<script>
export default {
    components: {
        'user-sync': () => import('@/components/UserSync'),
        'user-info': () => import('@/components/UserInfo'),
        'user-select': () => import('@/components/UserSelect')
    }
}
</script>

<style scoped>
.user-center {
    position: absolute;
    margin-top: 1em;
    padding: 1em;
}
.user-center > * {
    margin: 1em 0;
    border: 1px solid  #c1c4c8;
    border-radius: 4px;
    width: 100
}

@media screen and (max-width: 900px) {

.user-center {
    left: 0;
    right: 0;
}
}
</style>