<template>
  <notebox />
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    notebox: () => import ('@/components/Notebox')
  },
}
</script>
