<template>
<dl class="user-info">
    <dt class="avatar">
        <img v-if="user.avatar" :src="user.avatar" />
        <font-awesome-icon v-else icon="user" />
    </dt>
    <dd>{{user.name}}</dd>
    <dd><level-bar :point="user.point"/></dd>
</dl>
</template>
<script>
export default {
    components: {
        'level-bar': () => import('@/components/Levelbar')
    },
    computed: {
        user () {
            return this.$store.state.user
        }
    }
}
</script>
<style scoped>
.user-info .avatar {
    overflow: hidden;
    padding: 8px;
    font-size: 3em;
}
.avatar img {
    width: 1em;
    height: 1em;
    border-radius: 50%;
}
.user-info dt:hover {
    cursor: pointer;
}
.user-info {
    background: white;
}
.user-info dd {
    padding: 8px;
}
</style>