<template>
  <div>
    <slot />
  </div>
</template>
<script>
import { findComponentsDownward } from '~/utils/assist'
import Emitter from '~/mixins/emitter'

export default {
  name: 'CheckboxGroup',
  mixins: [ Emitter ],
  props: {
    value: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      currentValue: this.value,
      childrens: []
    }
  },
  watch: {
    value () {
      this.updateModel(true)
    }
  },
  mounted () {
    this.updateModel(true)
  },
  methods: {
    updateModel (update) {
      this.childrens = findComponentsDownward(this, 'Checkbox', 'CheckboxGroup')
      if (this.childrens) {
        const { value } = this
        this.childrens.forEach((child) => {
          child.model = value
          if (update) {
            child.currentValue = value.includes(child.label)
            child.group = true
          }
        })
      }
    },
    change (data) {
      this.currentValue = data
      this.$emit('input', data)
      this.$emit('on-change', data)
      this.dispatch('FormItem', 'on-form-change', data)
    }
  }
}
</script>
