<template>
  <i
    :class="classes"
    :style="styles"
    @click="handleClick"
  />
</template>
<script>
const prefixCls = 'smt-icon'

export default {
  name: 'Icon',
  props: {
    type: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: '16'
    }
  },
  computed: {
    classes () {
      return [`${prefixCls}`, { [`${prefixCls}-${this.type}`]: this.type !== '' }]
    },
    styles () {
      return {
        fontSize: `${this.size}px`
      }
    }
  },
  methods: {
    handleClick (event) {
      this.$emit('click', event)
    }
  }
}
</script>
