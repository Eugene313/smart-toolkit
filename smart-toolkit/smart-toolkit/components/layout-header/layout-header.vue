<template>
  <header role="banner">
    <div class="header-row">
      <HeaderContacts />
      <div class="header-time-lang">
        <HeaderTime />
        <HeaderLang />
      </div>
    </div>
    <div class="header-row header-row-logo">
      <HeaderLogo />
      <HeaderButtons
        @clickLogin="login"
        @clickLogOut="logout"
      />
    </div>
    <HeaderMenu />
  </header>
</template>
<script>
import HeaderContacts from '~/components/layout-header/header-contacts.vue'
import HeaderTime from '~/components/layout-header/header-time.vue'
import HeaderLang from '~/components/layout-header/header-lang.vue'
import HeaderLogo from '~/components/layout-header/header-logo.vue'
import HeaderButtons from '~/components/layout-header/header-buttons.vue'
import HeaderMenu from '~/components/layout-header/header-menu.vue'
import { mapActions } from 'vuex'

export default {
  name: 'LayoutHeader',
  components: {
    HeaderContacts,
    HeaderTime,
    HeaderLang,
    HeaderLogo,
    HeaderButtons,
    HeaderMenu
  },
  methods: {
    ...mapActions('oidc', ['authenticateOidc', 'signOutOidc']),
    login () {
      this.authenticateOidc()
    },
    logout () {
      this.$cookies.remove('access_token')
      this.signOutOidc()
    }
  }
}
</script>
<style lang="sass">
.header-row
  display: flex
  justify-content: space-between
  align-items: center
  padding: 10px 25px
  background: white
  min-height: 45px
  .header-time-lang
    display: flex
    align-items: center
.header-row-logo
  background: #f4f6f5
</style>
