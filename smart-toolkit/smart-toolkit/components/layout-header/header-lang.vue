<template>
  <div class="header-lang">
    <span @click="dropDownMenu = !dropDownMenu">
      {{ currentLang }}
    </span>
    <Icon
      type="angle-down"
      size="18"
    />
    <div
      v-if="dropDownMenu"
      class="lang-dropdown-menu"
    >
      <p
        class="dropdown-menu-item"
        @click="changeLocale('uk')"
      >
        Укр
      </p>
      <p
        class="dropdown-menu-item"
        @click="changeLocale('ru')"
      >
        Рус
      </p>
      <p
        class="dropdown-menu-item"
        @click="changeLocale('en')"
      >
        En
      </p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dropDownMenu: false
    }
  },
  computed: {
    currentLang () {
      if (this.$i18n.locale === 'en') {
        return 'En'
      } if (this.$i18n.locale === 'ru') {
        return 'Рус'
      }
      return 'Укр'
    }
  },
  methods: {
    changeLocale (lang) {
      this.$i18n.setLocale(lang)
      this.dropDownMenu = false
    }
  }
}
</script>
<style lang="sass">
.header-lang
  display: flex
  justify-content: center
  align-items: center
  cursor: pointer
  position: relative
  .lang-dropdown-menu
    position: absolute
    top: 30px
    right: 0
    background: white
    border-radius: 3px
    box-shadow: 0 0 10px -4px
    .dropdown-menu-item
      width: 150px
      padding: 13px 15px
      transition: 0.3s
      &:hover
        background-color: #f4f6f5
</style>
