<template>
  <div>
    <Card>
      <TenderPurchaseMenu />
      <TenderPurchaseSearch />
    </Card>
    <TenderPurchaseTabs v-if="false" />
    <div class="flex">
      <TenderPurchaseFilter />
      <div class="purchase-card-wrap">
        <TenderPurchaseSort />
        <TenderPurchaseCards />
      </div>
    </div>
  </div>
</template>
<script>
import TenderPurchaseMenu from '~/components/views/tenders-purchase/tenders-purchase-menu'
import TenderPurchaseSearch from '~/components/views/tenders-purchase/tender-purchase-search'
import TenderPurchaseTabs from '~/components/views/tenders-purchase/tender-purchase-tabs'
import TenderPurchaseFilter from '~/components/views/tenders-purchase/tender-purchase-filters'
import TenderPurchaseSort from '~/components/views/tenders-purchase/tenders-purchase-sort'
import TenderPurchaseCards from '~/components/views/tenders-purchase/tender-purchase-cards'
import breadCrumbs from '~/mixins/breadCrumbs'
import { mapState } from 'vuex'

export default {
  name: 'TenderPurchase',
  components: {
    TenderPurchaseMenu,
    TenderPurchaseSearch,
    TenderPurchaseTabs,
    TenderPurchaseFilter,
    TenderPurchaseSort,
    TenderPurchaseCards
  },
  mixins: [breadCrumbs],
  nuxtI18n: {
    paths: {
      uk: '/prozorro/publichni-zakupivli-prozorro',
      ru: '/prozorro/publichnye-zakupki-prozorro',
      en: '/prozorro/public-procurements-prozorro'
    }
  },
  async fetch ({ store, route }) {
    await store.dispatch('referenceBook/getReferenceBooks', [
      'mainProcurementCategories',
      'rationaleTypes',
      'paymentTermTypes',
      'regionsGeneralized',
      'awardStatuses',
      'tenderStatusesGeneralized',
      'biddingTypesGeneralized'
    ])
    await store.dispatch('tendersPurchase/getPageView', { mode: route.query.tm })
    await store.dispatch('tendersPurchase/setFilter', { route })
    await store.dispatch('tendersPurchase/getTenders')
  },
  data () {
    return {
      breadCrumbs: [
        { Title: 'main', To: '/' },
        { Title: 'publicProzorroPurchase' }
      ]
    }
  },
  computed: {
    ...mapState('tendersPurchase', [
      'TenderSearchFilter',
      'participationView',
      'participationStatusResults',
      'MyFilters',
      'SortingTypes',
      'UserOption',
      'User',
      'QueryFilter',
      'LastSearchFilter'
    ])
  }
}
</script>
<style lang="sass">
  .purchase-card-wrap
    flex: 2
</style>
