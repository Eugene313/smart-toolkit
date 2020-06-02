<template>
  <Form
    :rules="$v"
    :messages="messages"
    class="smt-login-form m-auto"
    @on-submit="checkForm"
  >
    <p class="smt-login-form-title mb-20">
      {{ $t('entrance') }}
    </p>
    <FormItem
      path="userLogin"
      :label="$t('login')"
      class="mb-10"
    >
      <TextInput
        v-model="userLogin"
        :placeholder="$t('loginEmail')"
      />
    </FormItem>
    <FormItem
      path="userPassword"
      :label="$t('password')"
      class="mb-50"
    >
      <PasswordInput
        v-model="userPassword"
        :placeholder="$t('password')"
      />
    </FormItem>
    <Button
      class="m-auto mb-40"
      color="success"
      type="submit"
    >
      {{ $t('signIn') }}
    </Button>
  </Form>
</template>
<script>
export default {
  data () {
    return {
      userLogin: '',
      userPassword: ''
    }
  },
  validations () {
    return {
      userLogin: {
        required: v => !!v
      },
      userPassword: {
        required: v => !!v
      }
    }
  },
  computed: {
    messages () {
      return {
        userLogin: { required: this.$t('required') },
        userPassword: { required: this.$t('required') }
      }
    }
  },
  methods: {
    checkForm () {
      if (!this.$v.$invalid) {
        this.sendForm()
      }
    },
    sendForm () {
      this.$api.post('/Authentication/LoginTestNuxt', {
        Email: this.userLogin,
        Password: this.userPassword
      })
        .then((resp) => {
          if (resp.data.Success) {
            window.reload()
          }
        })
    }
  }
}
</script>
