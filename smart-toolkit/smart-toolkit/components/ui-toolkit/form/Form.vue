<template>
  <form @submit.prevent="onSubmit">
    <slot />
  </form>
</template>
<script>
export default {
  name: 'SmtForm',
  props: {
    rules: {
      type: Object,
      default: () => ({})
    },
    messages: {
      type: Object,
      default: () => ({})
    }
  },
  provide () {
    return {
      rules: this.rules,
      messages: this.messages
    }
  },
  methods: {
    onSubmit () {
      this.rules.$touch()
      this.$emit('on-submit')
    }
  }
}
</script>
