<template>
  <div
    class="smt-form-item-wrap"
    :class="required"
  >
    <label
      v-if="label"
      class="smt-form-label"
      :for="forId"
    >
      {{ label }}
    </label>
    <div
      class="smt-form-item"
      :class="classes"
    >
      <slot />
      <div
        v-if="mess && (mess.default || errorMessage)"
        class="smt-form-input-message"
      >
        <div
          v-if="!v.$error && mess.default"
          class="smt-form-input-message-default"
        >
          <p>{{ mess.default }}</p>
        </div>
        <div
          v-else-if="v.$error"
          class="smt-form-input-message-error"
        >
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Emitter from '~/mixins/emitter'

export default {
  name: 'FormItem',
  mixins: [Emitter],
  props: {
    label: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: null
    },
    forId: {
      type: String,
      default: null
    }
  },
  inject: ['rules', 'messages'],
  computed: {
    v () {
      if (this.rules && this.path) {
        const paths = this.path.split('.')
        let currentRules = this.rules
        for (let i = 0; i < paths.length; ++i) {
          if (currentRules[paths[i]] === undefined) {
            return undefined
          }
          currentRules = currentRules[paths[i]]
        }
        return currentRules
      }
      return {}
    },
    mess () {
      if (this.messages && this.path) {
        const paths = this.path.split('.')
        let currentMessages = this.messages
        for (let i = 0; i < paths.length; ++i) {
          if (currentMessages[paths[i]] === undefined) {
            return undefined
          }
          currentMessages = currentMessages[paths[i]]
        }
        return currentMessages
      }
      return {}
    },
    errorMessage () {
      if (this.rules && this.messages) {
        let result = ''
        for (const item in this.v) {
          if (!!this.mess[item] && this.v[item] === false && item[0] !== '$') {
            result = this.mess[item]
            break
          }
        }
        return result
      }
      return null
    },
    classes () {
      return {
        'smt-form-item-error': this.v.$error
      }
    },
    required () {
      return {
        'smt-form-item-required': Object.prototype.hasOwnProperty.call(this.v, 'required')
      }
    }
  },
  mounted () {
    if (this.path) {
      this.setRules()
    }
  },
  methods: {
    setRules () {
      this.$off('on-form-blur', this.onFieldBlur)
      this.$on('on-form-blur', this.onFieldBlur)
    },
    onFieldBlur () {
      if (this.rules) {
        this.v.$touch()
      }
    }
  }
}
</script>
