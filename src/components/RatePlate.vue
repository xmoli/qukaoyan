<template>
    <div class="rate-plate">
        <ul>
            <li v-for="i in 4" :key="i"
                @click="handleSelect($event, i)"
            >
                <font-awesome-icon icon="clock" :class="{active: (i<= value)}"/>
            </li>
        </ul>

    </div>
</template>
<script>
export default {
    props: ['value'],
    methods: {
        handleSelect (event, index) {
            this.$emit('input', {event,rate: index})
        }
    }
}
</script>
<style>
.rate-plate ul li{
    display: inline;
    margin: 2px;
    font-size: .9em;
    color: gray;
}
.rate-plate ul li:hover {
    cursor: pointer;
}

.rate-plate .active {
    color: purple;
}
</style>