<template>
  <div class="container" />
</template>

<script>
import breadCrumbs from '~/mixins/breadCrumbs'

export default {
  name: 'Index',
  mixins: [breadCrumbs]
}
</script>

<style>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
</style>
