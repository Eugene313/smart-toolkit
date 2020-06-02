<template>
  <div />
</template>
<script>
import Oidc from 'oidc-client'

export default {
  layout: 'oidc',
  mounted () {
    const mgr = new Oidc.UserManager({ userStore: new Oidc.WebStorageStateStore(), loadUserInfo: true, filterProtocolClaims: true, response_mode: 'query' })
    mgr.signoutRedirectCallback().then(function () {
      window.location.href = '/'
    }).catch(function (err) {
      console.log(err)
    })
  }
}
</script>
