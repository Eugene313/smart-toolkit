<template>
  <Collapse
    v-model="value"
    :title="$t('rationaleTypeFilter')"
    icon="info"
    class="mb-30"
  >
    <CheckboxGroup
      v-model="RationaleIds"
      class="rationale-types-filter"
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
    RationaleIds: {
      get () {
        return this.TenderSearchFilter.RationaleIds
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'RationaleIds', payload })
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
  .rationale-types-filter
    padding: 10px 0
    .filter-item
      padding: 5px 0
</style>
