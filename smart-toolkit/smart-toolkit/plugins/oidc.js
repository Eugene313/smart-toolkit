import { vuexOidcCreateStoreModule } from 'vuex-oidc'
export default function (context) {
  console.log(context)
  context.store.registerModule('oidc', vuexOidcCreateStoreModule(
    {
      authority: 'https://test.smarttender.biz/2.0/login',
      client_id: 'smarttender.client',
      redirect_uri: window.location.origin + '/callback',
      response_type: 'code',
      scope: 'openid profile email phone qesignature',
      post_logout_redirect_uri: window.location.origin + '/callbacksignout',
      silent_redirect_uri: window.location.origin + '/callbackrenew',
      automaticSilentRenew: true,
      loadUserInfo: true,
      checkSessionInterval: 30000
    },
    {
      namespaced: true,
      dispatchEventsOnWindow: true
    }
  ), { preserveState: false })
}
