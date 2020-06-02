<template>
  <div
    class="header-row-menu"
    data-qa="header-menu"
  >
    <div
      v-for="item in menu"
      :key="item"
      class="menu-block"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      menu: [
        'Торговий майданчик',
        'Про SmartTender',
        'Регламент',
        'Інформаційний центр'
      ]
    }
  }
}
</script>
<style lang="sass">
.header-row-menu
  display: flex
  justify-content: center
  align-items: center
  background: white
  .menu-block
    width: 300px
    min-height: 40px
    display: flex
    justify-content: center
    align-items: center
    padding: 10px 0
    cursor: pointer
    font-size: 14px
    color: #014a90
</style>
