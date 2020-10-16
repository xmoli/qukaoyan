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
      'pageCurrent': state => state.noteInfo.current
    })
  },
  created () {
    switch (this.$route.params.page) {
      case 'today':
          this.$store.dispatch('getNoteToday')
          this.$store.commit('PAGE_CURRENT', this.page)
          break
      default:
          this.$store.commit('PAGE_CURRENT', this.$route.params.page)
          this.$store.dispatch('getNote', this.$route.params.page)
          break
    }
  },
  beforeRouteUpdate  (to, from , next) {
    switch (to.params.page) {
      case 'today':
        this.$store.dispatch('getNoteToday')
        this.$store.commit('PAGE_CURRENT', this.page)
        break
      default:
        this.$store.dispatch('getNote', to.params.page)
        if ((0 < to.params.page) && (to.params.page <= this.page)) {
          this.$store.commit('PAGE_CURRENT', to.params.page)
        } else {
          this.$router.push({name: 'Home', params: {page: from.params.page}})
        }
        break
    }
    next()
  }
}
</script>
