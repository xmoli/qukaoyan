<template>
<div class="level-bar">
    <div class="progress">
        <div class="before" :style="{width: precent + '%'}"/>
        <div class="level">Lv.{{level}}</div>
        <div class="text">{{point}}/{{lastLevelPoint}}</div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        point: {
            type: Number,
            default: 0
        }
        
    },
    computed: {
        //y = 250*x^2
        level () {
            if (this.point >= Number.MAX_SAFE_INTEGER) {
                return -1
            }
            let l = Math.sqrt(this.point/250)
            return Math.ceil(l)
        },
        lastLevelPoint () {
            const y = Math.pow(this.level, 2) * 250
            return Math.ceil(y)
        },
        precent () {
            return Math.ceil(this.point / this.lastLevelPoint * 100)
        }
    }
}
</script>
<style scoped>
.progress {
    position: relative;
    z-index: 2;
    overflow: hidden;
    display: flex;
    justify-content: space-around;
    margin: 8px;
    border-radius: 1em;
    height: 1em;
    border: none;
    box-shadow: 0 1px cornflowerblue,
        1px 0 cornflowerblue,
        0 -1px cornflowerblue,
        -1px 0 cornflowerblue;
}

.progress .before {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: -1;
    box-sizing: inherit;
    background: cornflowerblue;
}
</style>