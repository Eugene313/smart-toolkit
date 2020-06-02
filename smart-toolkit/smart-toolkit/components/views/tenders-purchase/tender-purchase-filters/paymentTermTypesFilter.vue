<template>
  <Collapse
    v-model="value"
    :title="$t('termsOfPayment')"
    icon="payment-conditions"
    class="mb-30"
  >
    <CheckboxGroup
      v-model="PaymentTermTypeIds"
      class="paymentTermTypesFilter-filter"
      @on-change="getTenders"
    >
      <CheckBox
        v-for="(filter, filterIndex) in filters"
        :key="filterIndex"
        class="filter-item"
        :label="filter.Id"
      >
        {{ filter.Title }}
      </CheckBox>
    </CheckboxGroup>
  </Collapse>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'PaymentTermTypesFilter',
  props: {
    filters: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      value: false
    }
  },
  computed: {
    ...mapState('tendersPurchase', [
      'TenderSearchFilter'
    ]),
    PaymentTermTypeIds: {
      get () {
        return this.TenderSearchFilter.PaymentTermTypeIds
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'PaymentTermTypeIds', payload })
      }
    }
  },
  methods: {
    ...mapMutations('tendersPurchase', [
      'setTenderSearchFilterKey'
    ]),
    ...mapActions('tendersPurchase', [
      'getTenders'
    ])
  }
}
</script>
<style lang="sass">
  .paymentTermTypesFilter-filter
    padding: 10px 0
    .filter-item
      padding: 5px 0
</style>
