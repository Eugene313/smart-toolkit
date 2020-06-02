<template>
  <div
    class="header-time"
    data-qa="header-time"
  >
    <Icon
      class="header-time-icon"
      type="clock"
      size="22"
    />
    {{ currentDay }} {{ currentMonth }}, {{ currentTime }}
  </div>
</template>
<script>
export default {
  name: 'HeaderTime',
  data () {
    return {
      currentDate: new Date()
    }
  },
  computed: {
    monthList () {
      return [
        this.$t('january'),
        this.$t('february'),
        this.$t('march'),
        this.$t('april'),
        this.$t('may'),
        this.$t('june'),
        this.$t('july'),
        this.$t('august'),
        this.$t('september'),
        this.$t('october'),
        this.$t('november'),
        this.$t('december')
      ]
    },
    currentDay () {
      return this.$moment(this.currentDate).format('DD')
    },
    currentMonth () {
      return this.monthList[this.currentDate.getMonth()]
    },
    currentTime () {
      return this.$moment(this.currentDate).format('HH:mm:ss')
    }
  },
  mounted () {
    // setInterval(() => {
    //   this.setCurrentDate()
    // })
  },
  methods: {
    setCurrentDate () {
      this.currentDate = new Date()
    }
  }
}
</script>
<style lang="sass">
.header-time
  min-width: 240px
  display: flex
  align-items: center
  .header-time-icon
    margin-right: 5px
</style>
