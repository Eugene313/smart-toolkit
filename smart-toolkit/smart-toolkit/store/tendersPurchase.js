const URL_GET_TENDERS = '/ProZorroTenders/GetTenders/'
const URL_PARTICIPATION_VIEW = '/ProZorroTenders/GetPageView/'

const DefaultFilter = {
  Page: 1,
  Sorting: 2,
  ParticipationStatus: 1,
  Phrase: null,
  PhraseAfterSearch: null,
  AddressSearchTypes: [1],
  TenderMode: 1,
  TradeSegment: 3,
  InitialRateFrom: null,
  InitialRateFromAfterSearch: null,
  InitialRateTo: null,
  InitialRateToAfterSearch: null,
  OrganizerIds: [],
  TenderStatuses: [],
  BiddingTypeCodes: [],
  GroupedBiddingTypeCodes: [],
  AwardStatusCodes: [],
  RegionInfos: [],
  CategoryIds: [],
  MyFilterId: null,
  PublicationFrom: null,
  PublicationTo: null,
  TenderingFrom: null,
  TenderingTo: null,
  TenderingEndDateFrom: null,
  TenderingEndDateTo: null,
  AuctionFrom: null,
  AuctionTo: null,
  MainProcurementCategoryIds: [],
  RationaleIds: [],
  PaymentTermTypeIds: [],
  CategoriesFromSubscription: false,
  ParticipantId: null,
  AssignedManagerIds: []
}

export const state = () => {
  return {
    participationView: null,
    participationStatusResults: null,
    MyFilters: null,
    SortingTypes: null,
    UserOption: null,
    User: null,
    TotalCount: null,
    TotalCountInAnotherSegment: null,
    TendersCount: null,
    SearchType: null,
    IsSubscribed: null,
    Tenders: [],
    TenderSearchFilter: DefaultFilter,
    DefaultFilter,
    QueryFilter: null,
    LastSearchFilter: null
  }
}
export const mutations = {
  setParticipationView (state, payload) {
    state.participationView = payload
  },
  setParticipationViewResults (state, payload) {
    state.participationStatusResults = payload
  },
  setMyFilters (state, payload) {
    state.MyFilters = payload
  },
  setSortingTypes (state, payload) {
    state.SortingTypes = payload
  },
  setUserOption (state, payload) {
    state.UserOption = payload
  },
  setUser (state, payload) {
    state.User = payload
  },
  setTotalCount (state, payload) {
    state.TotalCount = payload
  },
  setTotalCountInAnotherSegment (state, payload) {
    state.TotalCountInAnotherSegment = payload
  },
  setTendersCount (state, payload) {
    state.TendersCount = payload
  },
  setSearchType (state, payload) {
    state.SearchType = payload
  },
  setIsSubscribed (state, payload) {
    state.IsSubscribed = payload
  },
  setTenders (state, payload) {
    state.Tenders = payload
  },
  setTenderSearchFilter (state, payload) {
    state.TenderSearchFilter = payload
  },
  setTenderSearchFilterKey (state, { key, payload }) {
    state.TenderSearchFilter[key] = payload
  },
  setLastSearchFilter (state, payload) {
    state.LastSearchFilter = payload
  },
  setQueryFilter (state, { query }) {
    state.QueryFilter = {
      TradeSegment: 3,
      TenderMode: query.tm,
      Phrase: query.q,
      Page: query.p,
      ParticipationStatus: query.ps,
      Sorting: query.s,
      OrganizerIds: query.o,
      TenderStatuses: query.ts,
      BiddingTypeCodes: query.bt,
      GroupedBiddingTypeCodes: query.gbt,
      AddressSearchTypes: query.ast,
      RegionInfos: query.r,
      CategoryIds: query.c,
      AwardStatusCodes: query.aws,
      MainProcurementCategoryIds: query.mpc,
      RationaleIds: query.rt,
      PaymentTermTypeIds: query.ptt,
      AssignedManagerIds: query.am,
      MyFilterId: query.mf,
      InitialRateFrom: query.irf,
      InitialRateTo: query.irt,
      rPublicationFrom: query.pf,
      PublicationTo: query.pt,
      TenderingFrom: query.tf,
      TenderingTo: query.tt,
      TenderingEndDateFrom: query.tef,
      TenderingEndDateTo: query.tet,
      AuctionFrom: query.af,
      AuctionTo: query.a,
      CategoriesFromSubscription: query.cfs === '1'
    }
  }
}
export const actions = {
  setFilter ({ state, commit }, { route }) {
    if (Object.keys(route.query).length === 0) {
      if (
        state.UserOption &&
        state.UserOption.SearchParam &&
        state.UserOption.SearchParam.TradeSegment === 3 &&
        state.UserOption.SearchParam.TenderMode === 1
      ) {
        commit('setLastSearchFilter', state.UserOption.SearchParam)
      }
    } else {
      commit('setQueryFilter', { query: route.query })
      commit('setLastSearchFilter', state.QueryFilter)
    }
    if (state.LastSearchFilter) {
      commit('setTenderSearchFilter', state.LastSearchFilter)
    }
  },
  getPageView ({ state, commit }, { mode }) {
    return new Promise((resolve, reject) => {
      this.$api.get(URL_PARTICIPATION_VIEW, { mode })
        .then((response) => {
          commit('setParticipationView', response.data)
          commit('setMyFilters', state.participationView.MyFilters)
          commit('setSortingTypes', state.participationView.SortingTypes)
          commit('setUserOption', state.participationView.UserOption)
          commit('setUser', state.participationView.User)
          if (response.data.ParticipationStatusResults) {
            commit('setParticipationViewResults', JSON.parse(response.data.ParticipationStatusResults))
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  getTenders ({ state, commit }) {
    return new Promise((resolve, reject) => {
      this.$api.post(URL_GET_TENDERS, { searchParam: state.DefaultFilter })
        .then((resp) => {
          if (resp.data) {
            commit('setTotalCount', resp.data.TotalCount)
            commit('setTotalCountInAnotherSegment', resp.data.TotalCountInAnotherSegment)
            commit('setTendersCount', resp.data.TendersCount)
            commit('setSearchType', resp.data.SearchType)
            commit('setIsSubscribed', resp.data.IsSubscribed)
            commit('setTenders', resp.data.Tenders)
            resolve(resp.data)
          } else {
            reject(resp)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}
