<template>
  <Collapse
    v-model="value"
    :title="$t('dates')"
    icon="calendar-p"
    class="mb-30"
  >
    <Form class="date-filter">
      <div class="filter-item-wrap">
        <p class="filter-item-title">
          {{ $t('publicationDate') }}:
        </p>
        <div class="filter-item">
          <FormItem
            :label="$t('from') + ':'"
            class="filter-item-date"
          >
            <DatePicker
              v-model="PublicationFrom"
              @on-change="getTenders"
            />
          </FormItem>
          <FormItem
            :label="$t('to') + ':'"
            class="filter-item-date"
          >
            <DatePicker
              v-model="PublicationTo"
              @on-change="getTenders"
            />
          </FormItem>
        </div>
      </div>
      <div class="filter-item-wrap">
        <p class="filter-item-title">
          {{ $t('acceptanceOffers') }}:
        </p>
        <div class="filter-item">
          <FormItem
            :label="$t('from') + ':'"
            class="filter-item-date"
          >
            <DatePicker
              v-model="TenderingFrom"
              @on-change="getTenders"
            />
          </FormItem>
          <FormItem
            :label="$t('to') + ':'"
            class="filter-item-date"
          >
            <DatePicker
              v-model="TenderingTo"
              @on-change="getTenders"
            />
          </FormItem>
        </div>
      </div>
      <div class="filter-item-wrap">
        <p class="filter-item-title">
          {{ $t('tenderingEndDate') }}:
        </p>
        <div class="filter-item">
          <FormItem
            :label="$t('from') + ':'"
            class="filter-item-date"
          >
            <DatePicker
              v-model="TenderingEndDateFrom"
              @on-change="getTenders"
            />
          </FormItem>
          <FormItem
            :label="$t('to') + ':'"
            class="filter-item-date"
          >
            <DatePicker
              v-model="TenderingEndDateTo"
              @on-change="getTenders"
            />
          </FormItem>
        </div>
      </div>
      <div class="filter-item-wrap">
        <p class="filter-item-title">
          {{ $t('auctionDate') }}:
        </p>
        <div class="filter-item">
          <FormItem
            :label="$t('from') + ':'"
            class="filter-item-date"
          >
            <DatePicker
              v-model="AuctionFrom"
              @on-change="getTenders"
            />
          </FormItem>
          <FormItem
            :label="$t('to') + ':'"
            class="filter-item-date"
          >
            <DatePicker
              v-model="AuctionTo"
              @on-change="getTenders"
            />
          </FormItem>
        </div>
      </div>
    </Form>
  </Collapse>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'DateFilter',
  data () {
    return {
      value: false
    }
  },
  computed: {
    ...mapState('tendersPurchase', [
      'TenderSearchFilter'
    ]),
    PublicationFrom: {
      get () {
        return this.TenderSearchFilter.PublicationFrom
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'PublicationFrom', payload })
      }
    },
    PublicationTo: {
      get () {
        return this.TenderSearchFilter.PublicationTo
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'PublicationTo', payload })
      }
    },
    TenderingFrom: {
      get () {
        return this.TenderSearchFilter.TenderingFrom
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'TenderingFrom', payload })
      }
    },
    TenderingTo: {
      get () {
        return this.TenderSearchFilter.TenderingTo
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'TenderingTo', payload })
      }
    },
    TenderingEndDateFrom: {
      get () {
        return this.TenderSearchFilter.TenderingEndDateFrom
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'TenderingEndDateFrom', payload })
      }
    },
    TenderingEndDateTo: {
      get () {
        return this.TenderSearchFilter.TenderingEndDateTo
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'TenderingEndDateTo', payload })
      }
    },
    AuctionFrom: {
      get () {
        return this.TenderSearchFilter.AuctionFrom
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'AuctionFrom', payload })
      }
    },
    AuctionTo: {
      get () {
        return this.TenderSearchFilter.AuctionTo
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'AuctionTo', payload })
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
  .date-filter
    padding: 10px 0
    .filter-item-wrap
      margin-bottom: 10px
      .filter-item-title
        font-weight: bold
        font-size: 12px
        margin-bottom: 10px
      .filter-item
        display: flex
        justify-content: space-between
        align-items: center
        .filter-item-date
          width: 48%

</style>
