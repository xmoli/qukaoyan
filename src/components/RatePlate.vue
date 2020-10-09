<template>
    <div class="rate-plate">
        <ul>
            <li v-for="i in 3" :key="i"
                @click="handleSelect($event, i)"
            >
                <font-awesome-icon icon="clock" :class="{active: (i<= rate)}"/>
            </li>
        </ul>

    </div>
</template>
<script>
export default {
    data () {
        return {
            rate: 0
        }
    },
    methods: {
        handleSelect (event, index) {
            this.rate = index
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