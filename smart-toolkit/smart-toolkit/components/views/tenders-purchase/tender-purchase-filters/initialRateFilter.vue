<template>
  <Collapse
    v-model="value"
    :title="$t('initialRate')"
    icon="money"
    class="mb-30"
  >
    <Form class="initial-rate-filter">
      <FormItem
        class="filter-item"
        :label="$t('fromAnother') + ':'"
      >
        <NumberInput
          v-model="InitialRateFrom"
          @on-change="getTenders"
        />
      </FormItem>
      <FormItem
        class="filter-item"
        :label="$t('to') + ':'"
      >
        <NumberInput
          v-model="InitialRateTo"
          @on-change="getTenders"
        />
      </FormItem>
    </Form>
  </Collapse>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'InitialRateFilter',
  data () {
    return {
      value: false
    }
  },
  computed: {
    ...mapState('tendersPurchase', [
      'TenderSearchFilter'
    ]),
    InitialRateFrom: {
      get () {
        return this.TenderSearchFilter.InitialRateFrom
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'InitialRateFrom', payload })
      }
    },
    InitialRateTo: {
      get () {
        return this.TenderSearchFilter.InitialRateTo
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'InitialRateTo', payload })
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
  .initial-rate-filter
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10px 0
    .filter-item
      width: 48%
</style>
