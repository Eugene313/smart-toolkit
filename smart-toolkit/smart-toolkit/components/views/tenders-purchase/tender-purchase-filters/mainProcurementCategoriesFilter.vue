<template>
  <Collapse
    v-model="value"
    :title="$t('typeOfPurchaseItem')"
    icon="flag-o"
    class="mb-30"
  >
    <CheckboxGroup
      v-model="MainProcurementCategoryIds"
      class="main-procurement-categories-filter"
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
  name: 'MainProcurementCategories',
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
    ...mapState('tendersPurchase', ['TenderSearchFilter']),
    MainProcurementCategoryIds: {
      get () {
        return this.TenderSearchFilter.MainProcurementCategoryIds
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'MainProcurementCategoryIds', payload })
      }
    }
  },
  methods: {
    ...mapMutations('tendersPurchase', ['setTenderSearchFilterKey']),
    ...mapActions('tendersPurchase', ['getTenders'])
  }
}
</script>
<style lang="sass">
  .main-procurement-categories-filter
    padding: 10px 0
    .filter-item
      padding: 5px 0
</style>
