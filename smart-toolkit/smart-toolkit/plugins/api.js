const qs = require('qs')

export default function ({ $axios, app }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*'
      }
    },
    paramsSerializer: (params) => {
      return qs.stringify(params)
    }
  })
  api.setToken(app.$cookies.get('access_token'), 'Bearer')
  api.setBaseURL('https://test.smarttender.biz')
  inject('api', api)
}
