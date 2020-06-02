<template>
  <div>
    <CheckBox
      v-if="title.includes(searchValue) && multiple"
      :label="value"
      class="select-item"
    >
      {{ title }}
    </CheckBox>
    <CheckBox
      v-if="title.includes(searchValue) && !multiple"
      v-model="currentValue"
      :value="value"
      :true-value="value"
      class="select-item"
    >
      {{ title }}
    </CheckBox>
  </div>
</template>
<script>
import Emitter from '~/mixins/emitter'

export default {
  name: 'SelectItem',
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
      default: null
    },
    title: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.currentSelectValue
      },
      set (v) {
        this.dispatch('SelectInput', 'on-select-change', v)
        if (!this.multiple) {
          this.dispatch('SelectInput', 'on-item-change', v ? { value: this.value, title: this.title } : null)
        }
      }
    },
    searchValue () {
      return this.$searchValue()
    },
    multiple () {
      return this.$multipleProperty()
    },
    currentSelectValue () {
      return this.$currentSelectValue()
    }
  },
  inject: ['$searchValue', '$multipleProperty', '$currentSelectValue']
}
</script>
<style lang="sass">
  .select-item
    padding: 12px
    &:hover
      background: #edf2f7
</style>
