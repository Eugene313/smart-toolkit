<template>
  <div class="header-buttons">
    <Button
      v-if="!isAuthorized"
      color="success"
      class="login-button"
      data-qa="header-buttons-login"
      @click="login"
    >
      {{ $t('entrance') }}
    </Button>
    <Button
      v-if="!isAuthorized"
      data-qa="header-button-registration"
      @click="registration"
    >
      {{ $t('registration') }}
    </Button>
    <Button
      v-if="isAuthorized"
      @click="logOut"
    >
      {{ 'Выйти' }}
    </Button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isAuthorized: !!this.$cookies.get('access_token')
    }
  },
  methods: {
    registration () {
      this.$router.push({ path: this.localePath('/registration') })
    },
    login () {
      this.$emit('clickLogin')
    },
    logOut () {
      this.$emit('clickLogOut')
    }
  }
}
</script>
<style lang="sass">
.header-buttons
  display: flex
  justify-content: flex-end
  align-items: center
  .login-button
    margin-right: 10px
</style>
