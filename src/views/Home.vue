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
}
</script>
