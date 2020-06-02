export const state = () => ({
  breadCrumbs: []
})
export const mutations = {
  setBreadCrumbs (state, payload) {
    state.breadCrumbs = payload
  }
}
