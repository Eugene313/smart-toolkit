<template>
  <Collapse
    v-model="value"
    :title="$t('BiddingType2')"
    icon="vertical-lines"
    class="mb-30"
  >
    <CheckboxGroup
      v-model="BiddingTypeCodes"
      class="bidding-types-generalized-filter"
      @on-change="getTenders"
    >
      <div
        v-for="(filter, filterIndex) in filters"
        :key="filterIndex"
        class="filter-item"
      >
        <p class="filter-item-title">
          {{ filter.Title }}:
        </p>
        <CheckBox
          v-for="(filterItem, filterItemIndex) in filter.Items"
          :key="filterItemIndex"
          class="filter-item-sub-item"
          :label="filterItem.Id"
          :title="filterItem.Title"
        >
          {{ filterItem.Title }}
        </CheckBox>
      </div>
    </CheckboxGroup>
  </Collapse>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'BiddingTypesGeneralizedFilter',
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
    BiddingTypeCodes: {
      get () {
        return this.TenderSearchFilter.BiddingTypeCodes
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'BiddingTypeCodes', payload })
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
  .bidding-types-generalized-filter
    padding: 10px 0
    .filter-item
      padding: 5px 0
      .filter-item-title
        font-weight: bold
        font-size: 12px
        margin-bottom: 10px
      .filter-item-sub-item
        margin-bottom: 10px
</style>
