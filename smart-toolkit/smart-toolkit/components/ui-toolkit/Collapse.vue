<template>
  <div class="smt-collapse">
    <div
      class="smt-collapse-header"
      @click="toggleValue"
    >
      <Icon
        v-if="icon"
        :type="icon"
        class="smt-collapse-header-title-ico"
      />
      <span class="smt-collapse-header-title">
        {{ title }}
      </span>
      <Icon
        size="19"
        type="angle-right"
        class="smt-collapse-header-title-ico-arrow"
        :class="{'smt-collapse-header-title-ico-arrow-active': value }"
      />
    </div>
    <slot v-if="value" />
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
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
  .smt-collapse
    width: 100%
    .smt-collapse-header
      width: 100%
      position: relative
      display: flex
      align-items: center
      padding-right: 22px
      cursor: pointer
      .smt-collapse-header-title-ico
        margin-right: 12px
      .smt-collapse-header-title
        font-size: 16px
        font-weight: bold
      .smt-collapse-header-title-ico-arrow
        position: absolute
        right: 0
        color: #014A90
      .smt-collapse-header-title-ico-arrow-active
        transform: rotateZ(-90deg)
</style>
