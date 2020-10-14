<template>
<ul class="rate-plate">
    <li v-for="i in 4" :key="i"
        @click="handleSelect($event, i)"
        :class="{active: (i<= value)}"
    >
        <font-awesome-icon icon="clock" />
    </li>
</ul>
</template>
<script>
export default {
    props: ['value'],
    methods: {
        handleSelect (event, index) {
            this.$emit('input', {event, rate: index})
        }
    }
}
</script>
<style>
ul.rate-plate  li{
    display: inline;
    border: .2em solid transparent;
    color: gray;
}
ul.rate-plate  li:hover {
    cursor: pointer;
}

.rate-plate .active {
    color: #2a2aff;
}
</style>