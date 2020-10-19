<template>
    <div class="countdown">
        <div class="counter"
            @click.stop="toggleSelectList"
        >
            <span>
                {{event.prefix}}
            </span>
            <span class="number">
                {{spareDay}}
            </span>
            <span class="unit">
                {{event.suffix}}
            </span>
            <span @click.stop="handleToggleBoard">
                <font-awesome-icon icon="cog"
                    class="toggleBoardIcon"
                />
            </span>
        </div>
        <my-select 
            :anchor="anchorSelect"
            :options="dateOptions"
            @close="handleCloseSetting"
            @select="handleSelect"
        >
        </my-select>
        <pop-board 
            :open="popBoardOpen"
            @close="handleToggleBoard"
            class="count-down-pop-board"
        >   
            <dl>
                <dt></dt>
                <dd><font-awesome-icon icon="cog"/></dd>
                <dt>前缀</dt>
                <dd>
                    <input type="text"
                        v-model="event.prefix"
                    />
                </dd>
                <dt>日期</dt>
                <dd>
                    <input type="text"
                        placeholder="年-月-日：xxxx-xx-xx"
                        v-model="finishDateTemp"
                        @change="handleSelect(finishDateTemp)"
                    />
                </dd>
                <dt>后缀</dt>
                <dd>
                    <input type="text"
                        v-model="event.suffix"
                    />
                </dd>
                <dt></dt>
                <dd>
                    <input type="submit" value="设置"/>
                </dd>
            </dl>
        </pop-board>
    </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'

export default {
    components: {
        'my-select': () => import('./SelectOptions'),
        'pop-board': () => import('./Popboard')
    },
    data() {
        return {
            anchorSelect: {event: null, open: false},
            popBoardOpen: false,
            finishDateTemp: ''
        }
    },
    computed: {
        ...mapState(['event']),
        ...mapGetters(['dateOptions','finishDate']),
        endTime() {
            return new Date(this.finishDate).getTime()
        },
        spareDay() {//负数和零返回0
            let currentTime = new Date().getTime()
            if (this.endTime <= currentTime) {
                return 0
            }
            let duration = this.endTime - currentTime
            return Math.floor(duration/(24*60*60*1000))
        }
    },
    methods: {
        toggleSelectList (event) {
            this.anchorSelect = {event, open: !this.anchorSelect.open}
        },
        handleCloseSetting () {
            this.anchorSelect.open = false
        },
        handleSelect (value) {
            this.$store.commit('selectDate', value)  
        },
        handleToggleBoard () {
            if (this.anchorSelect.open === true) {
                this.anchorSelect.open = false
            }
            this.popBoardOpen = !this.popBoardOpen
        }
    },
    created () {
        this.$store.dispatch('getUserEvent')
    }
}
</script>
<style lang="stylus" scoped>
.countdown
    /* Box model */
    border-radius 8px
    /* Typograhic */
    font-size 16px
    /* Visual */
    border 1px solid #cacaee
    background white
    &:hover
        cursor pointer
    .number
        font-size 3em
        transition .3s
        &:hover
            color white
            text-shadow 0 0 .1em #2a75ff, 0 0 .3em #2a75ff
    span
        margin 8px
dt {
    text-align: start;
    color: gray;
    margin-top: 1em;
}
dt:first-child {
    margin-top: 0;
}

.count-down-pop-board input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid gray;
    outline-color: #2a2aee;
}
.count-down-pop-board input[type="submit"] {
    width: 100%;
    line-height: 1.5em;
    outline: none
}
.count-down-pop-board input[type="submit"]:hover {
    cursor: pointer;
    border: 1px solid #2a2aee;
}
</style>
