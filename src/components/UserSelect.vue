<template>
<dl class="user-select">
    <dt>用户切换</dt>
    <dd v-for="user in userList" :key="user.name">
        <dl class="user-status detail">
            <dt v-if="user.avatar"><img :src="user.avatar" /></dt>
            <dt v-else><font-awesome-icon icon="user"/></dt>
            <dd>{{user.name}}</dd>
            <dd class="online"><font-awesome-icon icon="check" v-if="user.status"/></dd>
        </dl>
    </dd>
    <dd>
        <font-awesome-icon icon="user-plus"/>
    </dd>
</dl>
</template>

<script>
export default {
    data () {
        return {
            userList: [
                {name: '小明',status: false},
                {name: '小红',status: true}
            ]
        }
    }
}
</script>

<style scoped>
.user-select>dt {
    width: fit-content;
    padding: .5em;
    text-align: start;
}

.user-select>dd {
    text-indent: 1em;
    border-top: 1px solid #c1c4c8;
    padding: 1em
}

.user-select>dd:hover {
    cursor: pointer;
}

dl.detail dt, dl.detail dd{
    display: inline;
    margin: 1em;
}

.user-status .online {
    width: 2em;
    color: #67C23A;
}
</style>