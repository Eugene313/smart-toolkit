<template>
  <div
    class="header-logo"
    data-qa="header-logo"
  >
    <nuxt-link :to="localePath('/')">
      <img
        src="~/static/images/logo/smarttender-logo.svg"
        alt="smarttenderlogo"
      >
    </nuxt-link>
  </div>
</template>
<style lang="sass">
.header-logo
  cursor: pointer
  img
    width: 225px
    height: 33.61px
</style>
