<template>
  <footer role="contentinfo">
    <LayoutFooterContacts />
    <LayoutFooterSiteMap />
  </footer>
</template>
<script>
import LayoutFooterContacts from '~/components/layout-footer/layout-footer-contacts.vue'
import LayoutFooterSiteMap from '~/components/layout-footer/layout-footer-site-map.vue'

export default {
  name: 'LayoutFooter',
  components: {
    LayoutFooterContacts,
    LayoutFooterSiteMap
  }
}
</script>
<style lang="sass">
  footer
    height: 530px
    background: white
</style>
