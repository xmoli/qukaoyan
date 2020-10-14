<template>
<dl class="user-info">
    <dt class="avatar">
        <img v-if="user.avatar" :src="user.avatar" />
        <font-awesome-icon v-else icon="user" />
    </dt>
    <dd><level-bar :point="user.point"/></dd>
    <dd>{{user.name}}</dd>
</dl>
</template>
<script>
export default {
    components: {
        'level-bar': () => import('@/components/Levelbar')
    },
    data () {
        return {
            user: {
                point: 200,
                name: '小红果'
            }
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
.user-info dt:hover {
    cursor: pointer;
}
</style>