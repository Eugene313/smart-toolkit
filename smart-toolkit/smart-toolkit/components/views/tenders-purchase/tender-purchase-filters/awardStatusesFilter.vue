<template>
  <Collapse
    v-model="value"
    :title="$t('statusOfMyPurchases')"
    icon="my-orders"
    class="mb-25"
  >
    <CheckboxGroup
      v-model="AwardStatusCodes"
      class="award-statuses-filter"
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
  name: 'RationaleTypesFilter',
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
    AwardStatusCodes: {
      get () {
        return this.TenderSearchFilter.AwardStatusCodes
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'AwardStatusCodes', payload })
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
  .award-statuses-filter
    padding: 10px 0
    .filter-item
      padding: 5px 0
</style>
