<template>
  <button
    ref="btn"
    :type="type"
    :class="classes"
    @click="handleClickLink"
    @mousedown="buttonClick('btn')"
  >
    <slot />
  </button>
</template>
<script>
const prefixCls = 'smt-btn'

export default {
  name: 'Button',
  props: {
    color: {
      type: String,
      default: 'primary'
    },
    type: {
      type: String,
      default: 'button'
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    classes () {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.color}`,
        { 'smt-btn-small': this.small }
      ]
    }
  },
  methods: {
    handleClickLink (event) {
      this.$emit('click', event)
    },
    buttonClick (ref) {
      this.$refs[ref].classList.add('smt-btn-active')
      const removeClass = () => {
        this.$refs[ref].classList.remove('smt-btn-active')
        document.removeEventListener('mouseup', removeClass)
      }
      document.addEventListener('mouseup', removeClass)
    }
  }
}
</script>
<style lang="sass">
.smt-btn
  display: flex
  justify-content: center
  align-items: center
  border: 1px solid transparent
  border-radius: 30px
  padding: 0 22px
  height: 38px
  cursor: pointer
  transition: 0.3s
  width: max-content
  font-size: 14px
  &:focus
    outline: none
.smt-btn-success
  border-color: #0b7b01
  color: #0b7b01
  background: none
.smt-btn-primary
  border-color: #014a90
  color: #014a90
  background: none
.smt-btn-success
  &:hover
    background: #0b7b01
    color: white
.smt-btn-primary
  &:hover
    background: #014a90
    color: white
.smt-btn-active
  transform: scale(0.9)
  opacity: 0.7
.smt-btn-small
  padding: 0 12px
  height: 25px
</style>
