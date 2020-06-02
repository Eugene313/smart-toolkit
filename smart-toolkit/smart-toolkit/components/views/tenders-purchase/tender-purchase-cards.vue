<template>
  <div class="purchase-cards">
    <div v-for="tender in Tenders" :key="tender.Title" class="purchase-cards-item">
      <p>{{ tender.AuctionStart }}</p>
      <p>{{ tender.Id }}</p>
      <p>{{ tender.Number }}</p>
      <p>{{ tender.StatusDateEndTitle }}</p>
      <p>{{ tender.Subject }}</p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'TenderPurchaseCards',
  computed: {
    ...mapState('tendersPurchase', [
      'Tenders'
    ])
  }
}
</script>
<style lang="sass">
  .purchase-cards
    margin: 4px 0 10px 10px
  .purchase-cards-item
    margin-bottom: 6px
    padding: 12px
    background: #FFFFFF
    border: 1px solid #E2E1E1
    border-radius: 6px
</style>
