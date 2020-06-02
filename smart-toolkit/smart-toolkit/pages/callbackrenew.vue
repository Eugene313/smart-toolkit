<template>
  <div />
</template>
<script>
import Oidc from 'oidc-client'

export default {
  layout: 'oidc',
  mounted () {
    new Oidc.UserManager({ response_mode: 'query' }).signinSilentCallback()
  }
}
</script>
