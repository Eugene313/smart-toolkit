<template>
  <div class="prozorro-tender-purchase-header-search">
    <label
      for="purchase-search-input"
      class="search-label"
      :class="{'search-label-active': inputActive || Phrase }"
    >
      {{ label }}
    </label>
    <input
      id="purchase-search-input"
      v-model="Phrase"
      type="text"
      class="search-input"
      @keyup.enter="getTenders"
      @focus="setInputActive(true)"
      @blur="onBlur"
    >
    <button
      ref="btn"
      class="purchase-search-button"
      type="button"
      @click="getTenders"
      @mousedown="buttonClick('btn')"
    >
      <Icon
        type="search"
        size="30"
        class="purchase-search-button-ico"
      />
    </button>
    <div class="purchase-search-sort">
      <CheckBox
        v-model="CategoriesFromSubscription"
        class="purchase-search-sort-subscription"
      >
        {{ $t('searchInTheCategoriesOfMySubscription') }}
      </CheckBox>
      <div class="purchase-search-sort-result">
        {{ $t('Found') }}: {{ TendersCount }}
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'TenderPurchaseSearch',
  data () {
    return {
      label: 'Для пошуку тендера введить назву або номер',
      inputActive: false
    }
  },
  computed: {
    ...mapState('tendersPurchase', [
      'TenderSearchFilter',
      'TendersCount'
    ]),
    Phrase: {
      get () {
        return this.TenderSearchFilter.Phrase
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'Phrase', payload })
      }
    },
    CategoriesFromSubscription: {
      get () {
        return this.TenderSearchFilter.CategoriesFromSubscription
      },
      set (payload) {
        this.setTenderSearchFilterKey({ key: 'CategoriesFromSubscription', payload })
      }
    }
  },
  methods: {
    ...mapMutations('tendersPurchase', ['setTenderSearchFilterKey']),
    ...mapActions('tendersPurchase', ['getTenders']),
    buttonClick (ref) {
      this.$refs[ref].classList.add('purchase-search-button-active')
      const removeClass = () => {
        this.$refs[ref].classList.remove('purchase-search-button-active')
        document.removeEventListener('mouseup', removeClass)
      }
      document.addEventListener('mouseup', removeClass)
    },
    setInputActive (v) {
      this.inputActive = v
    },
    onBlur () {
      this.$emit('on-blur', this.Phrase)
      this.setInputActive(false)
      this.getTenders()
    }
  }
}
</script>
<style lang="sass">
  .prozorro-tender-purchase-header-search
    width: 100%
    padding: 0 25px
    position: relative
    .search-input
      position: relative
      background: none
      width: 100%
      font-size: 16px
      border-radius: 50px
      border: 1px solid #024d90
      padding: 14px 48px 14px 24px
      outline: none
      margin-bottom: 3px
    .search-label
      position: absolute
      font-size: 16px
      left: 48px
      top: 14px
      background: white
      transition: 0.3s
    .search-label-active
      font-size: 12px
      top: -8px
      left: 44px
      padding: 0 4px
      color: #024d90
      z-index: 2
    .purchase-search-button
      position: absolute
      right: 24px
      top: 0
      background: linear-gradient(210.33deg, #014A90 13.06%, #049079 84.97%)
      width: 48px
      height: 48px
      display: flex
      justify-content: center
      align-items: center
      border: none
      border-radius: 50%
      outline: none
      cursor: pointer
      transition: 0.3s
      &:hover
        box-shadow: 0 0 15px -5px black
      .purchase-search-button-ico
        color: white
    .purchase-search-button-active
      transform: scale(0.9)
      opacity: 0.7
    .purchase-search-sort
      display: flex
      .purchase-search-sort-subscription
        padding: 13px 0
        margin-right: 25px
      .purchase-search-sort-result
        padding: 13px 0
</style>
