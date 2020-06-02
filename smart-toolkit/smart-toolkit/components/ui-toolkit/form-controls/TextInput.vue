<template>
  <div
    class="smt-input"
    :class="{'smt-input-disabled': disabled}"
    @click="click"
  >
    <input
      :id="id"
      ref="input"
      v-model="inputValue"
      type="text"
      :placeholder="placeholder"
      :readonly="readonly"
      :disabled="disabled"
      class="smart-input-value"
      :class="{ 'smt-input-with-value': !!inputValue }"
      @change="change"
      @blur="blur"
    >
  </div>
</template>
<script>
import Emitter from '~/mixins/emitter'

export default {
  name: 'TextInput',
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    change (v) {
      this.$emit('on-change', v)
    },
    blur (e) {
      this.$emit('on-blur', e)
      this.dispatch('FormItem', 'on-form-blur', this.inputValue)
    },
    click (e) {
      this.$emit('click', e)
    }
  }
}
</script>
