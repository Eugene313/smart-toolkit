const REFERENCE_BOOK_SET = 'REFERENCE_BOOK_SET'

const GetReferenceBooks = '/ReferenceBook/GetReferenceBooks'

export const state = () => ({
  referenceBooks: []
})
export const mutations = {
  [REFERENCE_BOOK_SET] (state, { value }) {
    state.referenceBooks = value
  }
}
export const actions = {
  getSomething ({ commit }, { endpoint, param, mutation }) {
    return new Promise((resolve, reject) => {
      this.$api.get(endpoint, param)
        .then((response) => {
          commit(mutation, { value: response.data })
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getReferenceBooks ({ dispatch }, referenceBookCodes) {
    return dispatch('getSomething', { endpoint: GetReferenceBooks, param: { params: { referenceBookCodes } }, mutation: REFERENCE_BOOK_SET })
  }
}
