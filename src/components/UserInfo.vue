<template>
<dl class="user-info">
    <dt>
        <img v-if="user.avatar" :src="user.avatar" />
        <font-awesome-icon v-else icon="user" />
    </dt>
    <dd>{{user.level}}</dd>
    <dd>{{user.name}}</dd>
</dl>
</template>
<script>
export default {
    data () {
        return {
            user: {
                level: 200,
                name: '小红果'
            }
        }
    }
}
</script>
<style scoped>
</style>