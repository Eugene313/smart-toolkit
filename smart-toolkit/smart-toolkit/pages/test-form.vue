<template>
  <div class="test-smt-form">
    <div class="test-smt-form-title">
      Тестовая форма
    </div>
    <Form
      :rules="$v"
      :messages="messages"
      class="test-form-wrap"
      @on-submit="sendForm"
    >
      <FormItem
        for-id="date"
        path="datePickerInput"
        label="Тест дата"
        class="mb-10 test-form-wrap-item"
      >
        <DatePicker id="date" v-model="datePickerInput" />
      </FormItem>
      <FormItem
        for-id="login"
        path="textInput"
        label="Тест текст"
        class="mb-10 test-form-wrap-item"
      >
        <TextInput id="login" v-model="textInput" />
      </FormItem>
      <FormItem
        for-id="password"
        path="passwordInput"
        label="Тест пароль"
        class="mb-10 test-form-wrap-item"
      >
        <PasswordInput id="password" v-model="passwordInput" />
      </FormItem>
      <FormItem
        for-id="password"
        path="numberInput"
        label="Тест номер"
        class="mb-10 test-form-wrap-item"
      >
        <NumberInput id="number-input" v-model="numberInput" />
      </FormItem>
      <FormItem
        for-id="password"
        path="selectInput"
        label="Тест селект"
        class="mb-10 test-form-wrap-item"
      >
        <SelectInput
          id="select"
          v-model="selectInput"
          :placeholder="$t('choose')"
          :multiple="true"
        >
          <SelectItem
            v-for="testItem in testItems"
            :key="testItem.id"
            :value="testItem.id"
            :title="testItem.title"
          />
        </SelectInput>
      </FormItem>
      <FormItem
        for-id="select2"
        path="check"
        label="Тест селект одиночный"
        class="mb-30 test-form-wrap-item"
      >
        <SelectInput
          id="select2"
          v-model="check"
          :placeholder="$t('choose')"
        >
          <SelectItem
            v-for="testItem in testItems"
            :key="testItem.id"
            :value="testItem.id"
            :title="testItem.title"
          />
        </SelectInput>
      </FormItem>
      <Button type="submit">
        {{ $t('send') }}
      </Button>
    </Form>
  </div>
</template>
<script>
import breadCrumbs from '~/mixins/breadCrumbs'

export default {
  name: 'TestForm',
  mixins: [breadCrumbs],
  data () {
    return {
      check: null,
      textInput: '',
      passwordInput: '',
      datePickerInput: null,
      numberInput: null,
      selectInput: [],
      testItems: [
        {
          id: 1,
          title: 'Тестовый 1'
        },
        {
          id: 2,
          title: 'Тестовый 2'
        },
        {
          id: 3,
          title: 'Тестовый 3'
        },
        {
          id: 4,
          title: 'Тестовый 4'
        },
        {
          id: 5,
          title: 'Тестовый 5'
        },
        {
          id: 6,
          title: 'Тестовый 6'
        },
        {
          id: 7,
          title: 'Тестовый 7'
        },
        {
          id: 8,
          title: 'Тестовый 8'
        }
      ]
    }
  },
  computed: {
    breadCrumbs () {
      return [
        { Title: 'main', To: '/' },
        { Title: 'test' }
      ]
    },
    messages () {
      return {
        textInput: { required: this.$t('required') },
        passwordInput: { required: this.$t('required') },
        datePickerInput: { required: this.$t('required') },
        selectInput: { required: this.$t('required') },
        numberInput: { required: this.$t('required') },
        check: { required: this.$t('required') }
      }
    }
  },
  methods: {
    sendForm () {
      this.$v.$touch()
    }
  },
  validations () {
    return {
      textInput: { required: v => !!v },
      passwordInput: { required: v => !!v },
      datePickerInput: { required: v => !!v },
      selectInput: { required: v => v ? v.length : false },
      numberInput: { required: v => !!v },
      check: { required: v => !!v }
    }
  }
}
</script>;
<style lang="sass">
  .test-smt-form
    background: white
    padding: 16px
    .test-smt-form-title
      font-size: 22px
      font-weight: bold
      margin-bottom: 30px
      text-align: center
    .test-form-wrap
      width: 500px
      margin: 0 auto
      display: flex
      flex-direction: column
      align-items: center
      .test-form-wrap-item
        width: 320px
</style>
