<template>
  <div
    ref="modal"
    class="smt-modal"
    :class="{'smt-modal-active': value}"
    @click="clickOutSide"
  >
    <div
      class="smt-modal-content"
      :style="{ width: width + 'px' }"
      :class="{'smt-modal-content-active': value}"
    >
      <slot v-if="value" />
      <div
        class="smt-close-button"
        @click="closeModal"
      >
        <Icon
          type="close"
          size="18"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '500'
    }
  },
  methods: {
    closeModal () {
      this.$emit('input', false)
    },
    clickOutSide (e) {
      if (e.target === this.$refs.modal) {
        this.closeModal()
      }
    }
  }
}
</script>
<style lang="sass">
  .smt-modal
    position: fixed
    top: 0
    right: 0
    left: 0
    bottom: 0
    display: flex
    align-items: center
    justify-content: center
    background-color: rgba(54, 82, 108, 0.799847)
    transition: 0.1s
    opacity: 0
    z-index: -1
    .smt-modal-content
      position: relative
      min-width: 200px
      min-height: 300px
      padding-top: 30px
      background: white
      border-radius: 7px
      box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)
      transition: 0.1s
      transform: scale(0.8)
    .smt-close-button
      position: absolute
      top: 0
      right: 0
      width: 30px
      height: 30px
      display: flex
      justify-content: center
      align-items: center
      cursor: pointer
      &:hover
        background: rgba(110, 110, 110, 0.06)
    .smt-modal-content-active
      transform: scale(1)
  .smt-modal-active
    z-index: 100
    opacity: 1
</style>
