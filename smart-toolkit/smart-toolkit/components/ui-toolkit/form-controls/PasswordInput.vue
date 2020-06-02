<template>
  <div
    class="smt-input smt-input-with-icon"
    :class="{'smt-input-disabled': disabled}"
  >
    <input
      :id="id"
      ref="input"
      v-model="inputValue"
      type="password"
      :placeholder="placeholder"
      :readonly="disabled"
      class="smart-input-value"
      :class="{ 'smt-input-with-value': !!inputValue }"
      @blur="blur"
    >
    <div class="input-icon">
      <Icon
        :type="PasswordShow ? 'eye' : 'eye-slash'"
        size="18"
        @click="showPassword"
      />
    </div>
  </div>
</template>
<script>
import Emitter from '~/mixins/emitter'

export default {
  name: 'PasswordInput',
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Number],
      default: null
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
    }
  },
  data () {
    return {
      PasswordShow: false
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
    showPassword () {
      if (this.$refs.input.type === 'password') {
        this.$refs.input.type = 'text'
        this.PasswordShow = true
      } else {
        this.$refs.input.type = 'password'
        this.PasswordShow = false
      }
    },
    blur (e) {
      this.$emit('on-blur', e)
      this.dispatch('FormItem', 'on-form-blur', this.inputValue)
    }
  }
}
</script>
