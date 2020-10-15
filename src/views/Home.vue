<template>
  <notebox />
</template>

<script>
import { mapActions } from 'vuex'
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    notebox: () => import ('@/components/Notebox')
  },
  methods: {
    ...mapActions([
      'getNoteTotal',
      'getNoteToday'
    ])
  },
  mounted () {
    this.getNoteTotal()
      .then( () => {
        this.getNoteToday()
      })
  }
}
</script>
