<template>
  <div class="prozorro-tender-purchase-body-filters">
    <AwardStatusesFilter
      :filters="referenceBooks.awardStatuses"
    />
    <TenderStatusesFilter
      :filters="referenceBooks.tenderStatusesGeneralized"
    />
    <BiddingTypesGeneralizedFilter
      :filters="referenceBooks.biddingTypesGeneralized"
    />
    <RationaleTypesFilter
      :filters="referenceBooks.rationaleTypes"
    />
    <MainProcurementCategoriesFilter
      :filters="referenceBooks.mainProcurementCategories"
    />
    <PaymentTermTypesFilter
      :filters="referenceBooks.paymentTermTypes"
    />
    <InitialRateFilter />
    <DateFilter />
  </div>
</template>
<script>
import AwardStatusesFilter from '~/components/views/tenders-purchase/tender-purchase-filters/awardStatusesFilter'
import TenderStatusesFilter from '~/components/views/tenders-purchase/tender-purchase-filters/tenderStatusesFilter'
import BiddingTypesGeneralizedFilter from '~/components/views/tenders-purchase/tender-purchase-filters/biddingTypesGeneralizedFilter'
import MainProcurementCategoriesFilter from '~/components/views/tenders-purchase/tender-purchase-filters/mainProcurementCategoriesFilter'
import RationaleTypesFilter from '~/components/views/tenders-purchase/tender-purchase-filters/rationaleTypesFilter'
import PaymentTermTypesFilter from '~/components/views/tenders-purchase/tender-purchase-filters/paymentTermTypesFilter'
import InitialRateFilter from '~/components/views/tenders-purchase/tender-purchase-filters/initialRateFilter'
import DateFilter from '~/components/views/tenders-purchase/tender-purchase-filters/dateFilter'

import { mapState } from 'vuex'

export default {
  name: 'TenderPurchaseFilters',
  components: {
    AwardStatusesFilter,
    TenderStatusesFilter,
    BiddingTypesGeneralizedFilter,
    MainProcurementCategoriesFilter,
    RationaleTypesFilter,
    PaymentTermTypesFilter,
    InitialRateFilter,
    DateFilter
  },
  computed: {
    ...mapState('referenceBook', ['referenceBooks'])
  }
}
</script>
<style lang="sass">
  .prozorro-tender-purchase-body-filters
    width: 288px
    height: max-content
    min-height: 800px
    background: white
    border-radius: 5px
    border: 1px solid #eef2f7
    margin-top: 5px
    padding: 18px 18px 18px 24px
</style>
