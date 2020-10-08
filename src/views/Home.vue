<template>
  <grassland />
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
    grassland: () => import ('@/components/Grassland')
  }
}
</script>
