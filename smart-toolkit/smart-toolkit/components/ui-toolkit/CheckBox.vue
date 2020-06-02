<template>
  <label class="smt-checkbox">
    <span class="smt-checkbox-mark">
      <span
        class="smt-checkbox-body-dot"
        :class="{ 'smt-checkbox-body-dot-active': currentValue }"
      />
    </span>
    <input
      v-if="group"
      :id="label"
      v-model="model"
      type="checkbox"
      :disabled="disabled"
      :value="label"
      :name="name"
      @change="change"
      @focus="onFocus"
      @blur="onBlur"
    >
    <input
      v-else
      type="checkbox"
      :disabled="disabled"
      :checked="currentValue"
      :name="name"
      @change="change"
      @focus="onFocus"
      @blur="onBlur"
    >
    <span v-if="showSlot" class="smt-checkbox-label">
      <slot />
    </span>
    <span v-else class="smt-checkbox-label">
      {{ label }}
    </span>
  </label>
</template>
<script>
import { findComponentUpward } from '~/utils/assist'
import Emitter from '~/mixins/emitter'

export default {
  name: 'Checkbox',
  mixins: [Emitter],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    value: {
      type: [String, Number, Boolean],
      default: false
    },
    trueValue: {
      type: [String, Number, Boolean],
      default: true
    },
    falseValue: {
      type: [String, Number, Boolean],
      default: null
    },
    label: {
      type: [String, Number, Boolean],
      default: null
    },
    indeterminate: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      model: [],
      currentValue: this.value,
      group: false,
      showSlot: true,
      parent: findComponentUpward(this, 'CheckboxGroup'),
      focusInner: false
    }
  },
  watch: {
    value (val) {
      if (val === this.trueValue || val === this.falseValue) {
        this.updateModel()
      } else {
        this.currentValue = false
      }
    }
  },
  mounted () {
    this.parent = findComponentUpward(this, 'CheckboxGroup')
    if (this.parent) {
      this.group = true
    }
    if (this.group) {
      this.parent.updateModel(true)
    } else {
      this.updateModel()
      this.showSlot = this.$slots.default !== undefined
    }
  },
  methods: {
    change (event) {
      if (this.disabled) {
        return false
      }
      const checked = event.target.checked
      this.currentValue = checked
      const value = checked ? this.trueValue : this.falseValue
      this.$emit('input', value)
      if (this.group) {
        this.parent.change(this.model)
      } else {
        this.$emit('on-change', value)
        this.dispatch('FormItem', 'on-form-change', value)
      }
    },
    updateModel () {
      this.currentValue = this.value === this.trueValue
    },
    onBlur () {
      this.focusInner = false
    },
    onFocus () {
      this.focusInner = true
    }
  }
}
</script>
<style lang="sass">
  .smt-checkbox
    display: flex
    cursor: pointer
    input
      width: 0
      height: 0
      opacity: 0
    .smt-checkbox-mark
      min-width: 18px
      min-height: 18px
      max-width: 18px
      max-height: 18px
      border: 1px solid #6AB42D
      border-radius: 4px
      margin-right: 8px
      display: flex
      justify-content: center
      align-items: center
      .smt-checkbox-body-dot
        width: 12px
        height: 12px
        background: #6AB42D
        transform: scale(0)
        transition: 0.3s
        border-radius: 2px
      .smt-checkbox-body-dot-active
        transform: scale(1)
    .smt-checkbox-label
      margin-top: 1px
</style>
