<template>
  <div
    class="smt-input"
    :class="{'smt-input-disabled': disabled}"
  >
    <imask-input
      ref="input"
      v-model="inputValue"
      :mask="Number"
      :min="min"
      :max="max"
      radix="."
      :readonly="disabled"
      :scale="digits"
      :unmask="true"
      :placeholder="placeholder"
      :pad-fractional-zeros="!!this.digits"
      :thousands-separator="thousandsSeparator"
      class="smart-input-value"
      :class="{ 'smt-input-with-value': !!inputValue }"
      @change="handleChange"
      @blur="handleBlur"
      @keyup.enter="handleEnter"
      @input="changeValue"
      @complete="onComplete"
    />
  </div>
</template>
<script>
import Emitter from '~/mixins/emitter'
import { IMaskComponent } from 'vue-imask'
export default {
  name: 'TextInput',
  components: {
    'imask-input': IMaskComponent
  },
  mixins: [Emitter],
  props: {
    value: {
      type: Number,
      default: null
    },
    large: {
      type: Boolean,
      default: false
    },
    digits: {
      type: Number,
      default: 2
    },
    disabled: {
      type: Boolean,
      default: false
    },
    thousandsSeparator: {
      type: String,
      default: ' '
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 99999999999999999
    },
    placeholder: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      inputValue: ''
    }
  },
  watch: {
    value () {
      if (this.value !== Number(this.inputValue)) {
        if (this.value) {
          this.inputValue = String(this.value)
        } else {
          this.inputValue = ''
        }
      }
    }
  },
  mounted () {
    if (this.value || this.value === 0) {
      this.inputValue = String(this.value)
    }
  },
  methods: {
    handleChange (event) {
      this.$emit('on-change', event)
    },
    handleEnter (event) {
      this.$emit('on-enter', event)
    },
    handleBlur (event) {
      this.$emit('on-blur', event)
      this.dispatch('FormItem', 'on-form-blur', this.inputValue)
    },
    onComplete (v) {
      if (Number(v) || v === '0') {
        this.$emit('input', Number(v))
      } else {
        this.$emit('input', null)
      }
    },
    changeValue () {
      this.$emit('on-input', this.inputValue)
    }
  }
}
</script>
