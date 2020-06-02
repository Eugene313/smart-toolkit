<template>
  <div />
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'OidcCallback',
  layout: 'oidc',
  computed: {
    ...mapGetters('oidc', ['oidcAccessToken'])
  },
  created () {
    if (process.client) {
      this.oidcSignInCallback()
        .then((path) => {
          this.$cookies.set('access_token', this.oidcAccessToken)
          this.$router.push(path)
        })
        .catch(() => {
          this.$router.push('/signin-oidc-error')
        })
    }
  },
  methods: {
    ...mapActions('oidc', [
      'oidcSignInCallback'
    ])
  }
}
</script>
