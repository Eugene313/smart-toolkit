<template>
  <div
    ref="selectInput"
    class="smt-select-input"
  >
    <div class="smt-input">
      <input
        :value="selectedItems"
        class="smart-input-value"
        :class="{ 'smt-input-with-value': !!selectedItems }"
        :readonly="true"
        :placeholder="placeholder"
        @click="openDropDawn"
      />
    </div>
    <CheckboxGroup
      v-if="active && multiple"
      v-model="inputValue"
      class="smt-select-dropdown"
    >
      <input
        ref="search"
        v-model="searchValue"
        :placeholder="$t('search')"
        type="text"
        class="select-search-input"
        @input="search"
      >
      <div class="select-items-wrap">
        <slot />
      </div>
    </CheckboxGroup>
    <div
      v-if="active && !multiple"
      class="smt-select-dropdown"
    >
      <input
        ref="search"
        v-model="searchValue"
        :placeholder="$t('search')"
        type="text"
        class="select-search-input"
        @input="search"
      >
      <div class="select-items-wrap">
        <slot />
      </div>
    </div>
  </div>
</template>
<script>
import Emitter from '~/mixins/emitter'

export default {
  name: 'SelectInput',
  mixins: [Emitter],
  props: {
    value: {
      type: [Array, String, Number],
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      active: false,
      searchValue: '',
      currentItem: null
    }
  },
  computed: {
    selectedItems () {
      if (this.multiple) {
        if (this.value && this.value.length) {
          return this.$t('selected') + ' ' + this.value.length
        }
        return ''
      } else {
        if (typeof this.value === 'number') {
          return this.currentItem.title
        }
        if (typeof this.value === 'string') {
          return this.currentItem.title
        }
        return ''
      }
    },
    inputValue: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    },
    searchValueProperty () {
      return this.searchValue
    },
    multipleProperty () {
      return this.multiple
    },
    currentSelectValue () {
      return this.value
    }
  },
  provide () {
    return {
      $searchValue: () => this.searchValueProperty,
      $multipleProperty: () => this.multipleProperty,
      $currentSelectValue: () => this.currentSelectValue
    }
  },
  mounted () {
    this.setEmits()
  },
  methods: {
    dispatchFormItem () {
      this.dispatch('FormItem', 'on-form-blur', this.value)
    },
    setEmits () {
      this.$off('on-select-change', this.setValue)
      this.$on('on-select-change', this.setValue)
      this.$off('on-item-change', this.setCurrentItem)
      this.$on('on-item-change', this.setCurrentItem)
    },
    setValue (v) {
      this.$emit('input', v)
    },
    setCurrentItem (item) {
      this.currentItem = item
    },
    openDropDawn () {
      const selectInput = this.$refs.selectInput
      const clickOutSide = (e) => {
        if (this.active && e.target !== selectInput && !selectInput.contains(e.target)) {
          this.setActive(false)
          this.searchValue = ''
          this.$emit('on-change')
          this.dispatchFormItem()
          document.removeEventListener('click', clickOutSide)
        } else {
          this.setActive(true)
          this.$nextTick(() => {
            this.$refs.search.focus()
          })
        }
      }
      document.addEventListener('click', clickOutSide)
    },
    setActive (v) {
      this.active = v
    },
    search () {
      this.$emit('on-search', this.searchValue)
    }
  }
}
</script>
<style lang="sass">
  .smt-select-input
    position: relative
    width: 100%
    .smt-select-dropdown
      display: flex
      flex-direction: column
      position: absolute
      top: 0
      right: 0
      left: 0
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)
      border-radius: 6px
      background: white
      z-index: 1
      .select-search-input
        padding: 12px
        background: white
        border: 1px solid transparent
        border-radius: 6px
        width: 100%
        font-size: 14px
        cursor: pointer
        color: #495060
        outline: none
      .select-items-wrap
        border-top: 1px solid #e5e5e5
        max-height: 250px
        overflow-y: scroll
        overflow-x: hidden
        &::-webkit-scrollbar
          background-color: #e9ecee
          height: 10px
          width: 10px
          padding: 1px 0
        &::-webkit-scrollbar-thumb
          border-radius: 5px
          background-color: #d7e0ea
          cursor: pointer
          margin: 1px 0
          &:hover
            background-color: #7A98B4
        &::-webkit-scrollbar-track
          border-radius: 5px
          background-color: #e9ecee
          padding: 1px 0
</style>
