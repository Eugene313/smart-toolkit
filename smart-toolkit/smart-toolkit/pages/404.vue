<template>
  <NotFound />
</template>
<script>
import breadCrumbs from '~/mixins/breadCrumbs'
import NotFound from '~/components/NotFound.vue'

export default {
  name: 'NotFoundPage',
  components: {
    NotFound
  },
  mixins: [breadCrumbs],
  computed: {
    breadCrumbs () {
      return [
        { Title: 'main', To: '/' },
        { Title: 'notFound' }
      ]
    }
  }
}
</script>
