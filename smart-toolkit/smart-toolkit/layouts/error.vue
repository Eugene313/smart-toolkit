<template>
  <div class="root-error" />
</template>
<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },
  created () {
    if (this.error.statusCode === 404) {
      this.$router.push({ path: this.localePath('/404') })
    }
  }
}
</script>
<style lang="sass">
  .root-error
    min-height: 80vh
</style>
