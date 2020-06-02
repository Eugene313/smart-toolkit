<template>
  <span
    class="smt-radio-button"
    :class="{'smt-radio-button-active': value }"
    @click="toggleValue"
  >
    <span class="smt-radio-button-dot" />
  </span>
</template>
<script>
export default {
  name: 'RadioButton',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleValue () {
      this.$emit('input', !this.value)
    }
  }
}
</script>
<style lang="sass">
  .smt-radio-button
    display: inline-block
    width: 18px
    height: 18px
    border: 1px solid #6AB42D
    border-radius: 50%
    cursor: pointer
    .smt-radio-button-dot
      display: inline-block
      margin: 2px
      width: 12px
      height: 12px
      background: #6AB42D
      border-radius: 50%
      transform: scale(0)
      transition: 0.3s
  .smt-radio-button-active
    .smt-radio-button-dot
      transform: scale(1)
</style>
