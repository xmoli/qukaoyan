<template>
    <dl class="user-sync">
        <dt @click="syncUserInfo">
            <font-awesome-icon icon="sync" class="sync-icon"/>
        </dt>
    </dl>
</template>
<script>
export default {
    methods: {
        syncUserInfo () {
            this.$store.dispatch('updateUserInfo')
        }
    }
}
</script>
<style scoped>
.user-sync dt{
    border: .5em solid transparent;
    background: white;
}
.user-sync dt:hover {
    cursor: pointer;
}
</style>