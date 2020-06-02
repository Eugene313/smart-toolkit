<template>
  <div>
    <LayoutHeader />
    <BreadCrumbs />
    <main role="main">
      <nuxt class="root" />
    </main>
    <SeoText />
    <LayoutFooter />
  </div>
</template>
<script>
import LayoutHeader from '~/components/layout-header/layout-header.vue'
import LayoutFooter from '~/components/layout-footer/layout-footer.vue'
import BreadCrumbs from '~/components/bread-crumbs/bread-crumbs.vue'
import SeoText from '~/components/seo-text/seo-text.vue'
import { mapActions } from 'vuex'
export default {
  name: 'DefaultLayout',
  components: {
    LayoutHeader,
    BreadCrumbs,
    LayoutFooter,
    SeoText
  },
  data () {
    return {
      isAuthorized: !!this.$cookies.get('access_token')
    }
  },
  mounted () {
    if (this.isAuthorized) {
      this.getOidcUser()
    } else {
      this.authenticateOidcSilent()
    }
  },
  methods: {
    ...mapActions('oidc', ['authenticateOidcSilent', 'getOidcUser'])
  }
}
</script>
<style>
html {
  font-family: 'GothamPro Regular', 'Source Sans Pro', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
  color: #495060;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
input, button {
  font-family: 'GothamPro Regular', 'Source Sans Pro', -apple-system,
  BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif !important;
}
body {
  background: #f4f6f5;
}
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
.root {
  max-width: 1200px;
  min-height: 70vh;
  margin: 0 auto;
}
</style>
