<template>
  <notebox />
</template>

<script>
import { mapState } from 'vuex'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    notebox: () => import ('@/components/Notebox')
  },
  computed: {
    ...mapState({
      'page': state => state.noteInfo.page,
      'pageCurrent': state => state.noteInfo.current,
      note: state => state.note
    })
  },
  methods: {
    listenRoute (to, from) {
      let toPage = Number.parseInt(to.params.page)
      let fromPage = Number.parseInt(from.params.page)

      switch (toPage) {
        case 'today':
          this.$store.dispatch('getNoteToday')
            .then( () => {
              this.$store.commit('PAGE_CURRENT', this.page)
              this.$store.commit('TODO', this.page)
            })
          break
        default:
          if ((0 < toPage) && (toPage <= this.page)) {//toPage有效
            this.$store.dispatch('getNote', toPage)
              .then( () => {
                this.$store.commit('PAGE_CURRENT', toPage)//设置当前页码
                this.$store.commit('TODO', toPage)
              })
            break
          }
          //toPage 无效
          if ((0 < fromPage) && (fromPage <= this.page)) {//fromPage有效
            this.$router.push({name: 'Home', params: {page: fromPage}})//跳回
          } else {//fromPage无效
            this.$router.push({name:'Home', params:{page: 'today'}})//跳转至默认主页
          }
          this.$store.commit('error', {type:'RouterError', message:`page: ${toPage} Not found!`})
          break
      }
    }
  },
  created () {
    //初始化页面数据
    let routePage = Number.parseInt(this.$route.params.page)
    switch (routePage) {
      case 'today':
          this.$store.dispatch('getNoteToday')
          this.$store.commit('PAGE_CURRENT', this.page)
            .then( () => {
              this.$store.commit('TODO', this.page)
            })
          break
      default:
          this.$store.commit('PAGE_CURRENT', routePage)
          this.$store.dispatch('getNote', routePage)
            .then( () => {
              this.$store.commit('TODO', routePage)
            })
          break
    }
  },
  beforeRouteUpdate  (to, from , next) {
    //更新数据
    this.listenRoute(to, from)
    next()
  }
}
</script>
