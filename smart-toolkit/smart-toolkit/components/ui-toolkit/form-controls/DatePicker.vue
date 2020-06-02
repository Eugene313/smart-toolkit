<template>
  <div
    ref="calendar"
    class="smt-input smt-input-with-icon"
  >
    <input
      :id="id"
      v-model="parseDate"
      type="text"
      class="smart-input-value"
      :class="{ 'smt-input-with-value': !!parseDate }"
      @blur="blur"
      @change="dateParsing"
      @enter="dateParsing"
    >
    <Icon
      class="date-picker-button"
      type="calendar"
      color="#adc0d3"
      @click="toggleCalendarState"
    />
    <div :class="classes">
      <div v-if="calendarState"  class="date-picker-header">
        <div class="date-picker-full-year">
          {{ currentDate.getFullYear() }}
        </div>
        <div class="date-picker-full-date">
          <span v-if="typeDate">
            {{ fullDateDay }}
          </span>
          <span v-if="typeDate || typeMonth">
            {{ fullDateMonth }}
          </span>
        </div>
      </div>
      <div v-if="calendarState" class="date-picker-body">
        <div :class="yearClasses">
          <div class="date-picker-controls">
            <Icon
              type="chevron-left"
              size="16"
              class="date-picker-control-button"
              @click="setCalendarYear(-16)"
            />
            <h4 class="date-picker-control-value">
              {{ $t('year') }}
            </h4>
            <Icon
              type="chevron-right"
              size="16"
              class="date-picker-control-button"
              @click="setCalendarYear(16)"
            />
          </div>
          <div class="date-picker-year-list">
            <div
              v-for="yearListItem in yearList"
              :key="yearListItem"
              :class="yearListClasses(yearListItem)"
              @click="setYear(yearListItem)"
            >
              {{ yearListItem }}
            </div>
          </div>
        </div>
        <div :class="monthClasses">
          <div class="date-picker-controls">
            <Icon
              type="chevron-left"
              size="16"
              class="date-picker-control-button"
              @click="setCalendarYear(-1)"
            />
            <h4
              class="date-picker-control-value"
              @click="setMonthSelectState(false)"
            >
              {{ year }}
            </h4>
            <Icon
              type="chevron-right"
              size="16"
              class="date-picker-control-button"
              @click="setCalendarYear(1)"
            />
          </div>
          <div class="date-picker-month-list">
            <div
              v-for="(monthListItem, monthIndex) in monthList"
              :key="monthListItem"
              class="date-picker-month-list-item"
              :class="monthListClasses(monthIndex)"
              @click="setMonth(monthIndex)"
            >
              {{ monthListItem }}
            </div>
          </div>
        </div>
        <div :class="dayClasses">
          <div class="date-picker-controls">
            <Icon
              type="chevron-left"
              size="16"
              class="date-picker-control-button"
              @click="setCalendarMonth(-1)"
            />
            <h4
              class="date-picker-control-value"
              @click="setDaySelectState(false)"
            >
              {{ month }} {{ year }}
            </h4>
            <Icon
              type="chevron-right"
              size="16"
              class="date-picker-control-button"
              @click="setCalendarMonth(1)"
            />
          </div>
          <div class="date-picker-day-row">
            <div
              v-for="day in newWeekList"
              :key="day"
              class="date-picker-day-header"
            >
              <div class="date-picker-day-header-value">
                {{ day.substring(0, 1) }}
              </div>
            </div>
          </div>
          <div
            v-for="(row, index) in calendar"
            :key="index"
            class="date-picker-day-row"
          >
            <div
              v-for="(date, colindex) in row"
              :key="colindex"
              :class="dayListClasses(date)"
              @click="setDate(date)"
            >
              <div
                :class="dateListClasses(date)"
              >
                {{ date.getDate() }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Emitter from '~/mixins/emitter'

export default {
  name: 'DatePicker',
  mixins: [Emitter],
  props: {
    value: {
      type: [String, Date],
      default: ''
    },
    type: {
      type: String,
      default: 'date'
    },
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      calendarState: false,
      monthSelectState: this.type === 'date' || this.type === 'month',
      daySelectState: this.type === 'date',
      calendarDate: new Date(),
      currentDate: new Date(),
      parseDate: null
    }
  },
  i18n: {
    messages: {
      uk: {
        january: 'Січень',
        february: 'Лютый',
        march: 'Березень',
        april: 'Квітень',
        may: 'Травень',
        june: 'Червень',
        july: 'Липень',
        august: 'Cерпень',
        september: 'Вересень',
        october: 'Жовтень',
        november: 'Листопад',
        december: 'Грудень',
        year: 'Рік',
        mon: 'Понеділок',
        tue: 'Вівторок',
        wed: 'Середа',
        thu: 'Четвер',
        fri: 'П\'ятниця',
        sat: 'Субота',
        sun: 'Неділя'
      },
      ru: {
        january: 'Январь',
        february: 'Февраль',
        march: 'Март',
        april: 'Апрель',
        may: 'Май',
        june: 'Июнь',
        july: 'Июль',
        august: 'Август',
        september: 'Сентябрь',
        october: 'Октябрь',
        november: 'Ноябрь',
        december: 'Декабрь',
        year: 'Год',
        mon: 'Понедельник',
        tue: 'Вторник',
        wed: 'Среда',
        thu: 'Четверг',
        fri: 'Пятница',
        sat: 'Суббота',
        sun: 'Воскресенье'
      },
      en: {
        january: 'January',
        february: 'February',
        march: 'March',
        april: 'April',
        may: 'May',
        june: 'June',
        july: 'July',
        august: 'August',
        september: 'September',
        october: 'October',
        november: 'November',
        december: 'December',
        year: 'Year',
        mon: 'Monday',
        tue: 'Tuesday',
        wed: 'Wednesday',
        thu: 'Thursday',
        fri: 'Friday',
        sat: 'Saturday',
        sun: 'Sunday'
      }
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },
    format () {
      let format
      switch (this.type) {
        case 'date':
          format = 'DD.MM.YYYY'
          break
        case 'month':
          format = 'MM.YYYY'
          break
        case 'year':
          format = 'YYYY'
          break
        default:
          format = ''
      }
      return format
    },
    fullDateDay () {
      return `
        ${this.weekList[this.currentDate.getDay()]},
        ${this.currentDate.getDate()}
      `
    },
    fullDateMonth () {
      return `${this.monthList[this.currentDate.getMonth()]}`
    },
    classes () {
      return [
        'date-picker',
        { 'date-picker-active': this.calendarState }
      ]
    },
    yearClasses () {
      return [
        'date-picker-year'
      ]
    },
    monthClasses () {
      return [
        'date-picker-month',
        { 'date-picker-month-active': this.monthSelectState }
      ]
    },
    dayClasses () {
      return [
        'date-picker-day',
        { 'date-picker-day-active': this.daySelectState }
      ]
    },
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
    weekList () {
      return [
        this.$t('sun'),
        this.$t('mon'),
        this.$t('tue'),
        this.$t('wed'),
        this.$t('thu'),
        this.$t('fri'),
        this.$t('sat')
      ]
    },
    newWeekList () {
      const newList = [...this.weekList]
      newList.push(newList.shift())
      return newList
    },
    month () {
      return this.monthList[this.calendarDate.getMonth()]
    },
    year () {
      return this.calendarDate.getFullYear()
    },
    calendar () {
      const calendar = []
      for (let i = 0; i < 6; i++) {
        calendar.push([])
      }
      const firstDate = new Date(
        this.calendarDate.getFullYear(),
        this.calendarDate.getMonth(),
        this.calendarDate.getDate() - (this.calendarDate.getDay() - 1 >= 0 ? this.calendarDate.getDay() - 1 : 6)
      )
      let startCount = firstDate.getDate()
      for (const row of calendar) {
        for (let col = 0; col < 7; col++) {
          row.push(new Date(
            firstDate.getFullYear(),
            firstDate.getMonth(),
            startCount
          ))
          startCount++
        }
      }
      return calendar
    },
    yearList () {
      const result = []
      let counter = this.calendarDate.getFullYear()
      for (let i = 0; i < 16; i++) {
        result.push(counter)
        counter++
      }
      return result
    },
    typeDate () {
      return this.type === 'date'
    },
    typeMonth () {
      return this.type === 'month'
    },
    typeYear () {
      return this.type === 'year'
    }
  },
  created () {
    const startDate = this.setInputValueToDate(this.inputValue)
    if (startDate) {
      this.setInputValue(startDate)
      this.createCalendar(startDate)
    } else {
      this.createCalendar(null)
    }
  },
  methods: {
    blur () {
      this.dispatch('FormItem', 'on-form-blur', this.value)
    },
    checkValidityDate (date, format) {
      return this.$moment(date, format).toDate().toDateString() !== 'Invalid Date'
    },
    setInputValueToDate (date) {
      if (this.checkValidityDate(date, this.format)) {
        return this.$moment(date, this.format).toDate()
      }
      if (this.checkValidityDate(date)) {
        return this.$moment(date).toDate()
      }
      return false
    },
    createCalendar (date, format = this.format) {
      if (date) {
        this.setParseDate(this.$moment(date).format(format))
        this.setCalendarDate(new Date(date.getFullYear(), date.getMonth(), 1))
        this.setCurrentDate(date)
      } else {
        this.setParseDate(null)
        this.setCurrentDate(new Date())
        this.setCalendarDate(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1))
      }
    },
    dateParsing () {
      if (this.parseDate) {
        const toDate = this.setInputValueToDate(this.parseDate)
        if (toDate) {
          this.createCalendar(toDate)
          this.setInputValue(toDate)
        } else {
          this.createCalendar(this.inputValue)
          this.setInputValue(this.inputValue)
        }
      } else {
        this.createCalendar(null)
        this.setInputValue(null)
      }
    },
    toggleCalendarState () {
      this.setCalendarState(!this.calendarState)
      this.clickOutSide()
    },
    clickOutSide () {
      const clickOutSide = (e) => {
        if (this.calendarState && this.$refs.calendar !== e.target && !this.$refs.calendar.contains(e.target)) {
          this.setCalendarState(false)
          document.removeEventListener('click', clickOutSide)
        }
      }
      document.addEventListener('click', clickOutSide)
    },
    setCalendarState (v) {
      this.calendarState = v
    },
    setInputValue (v) {
      this.inputValue = v
    },
    setParseDate (v) {
      this.parseDate = v
    },
    setCalendarDate (v) {
      this.calendarDate = v
    },
    setCalendarMonth (v) {
      this.setCalendarDate(new Date(
        this.calendarDate.getFullYear(),
        this.calendarDate.getMonth() + v,
        1
      ))
    },
    setCalendarYear (v) {
      this.setCalendarDate(new Date(
        this.calendarDate.getFullYear() + v,
        this.calendarDate.getMonth(),
        1
      ))
    },
    setCurrentDate (v) {
      this.currentDate = v
    },
    setDaySelectState (v) {
      this.daySelectState = v
    },
    setMonthSelectState (v) {
      this.monthSelectState = v
    },
    setDate (date) {
      this.createCalendar(date)
      this.setCalendarState(false)
      this.setInputValue(this.currentDate)
      this.$emit('on-change', this.inputValue)
    },
    setMonth (monthIndex) {
      if (this.typeDate) {
        this.setCalendarDate(new Date(
          this.calendarDate.getFullYear(),
          monthIndex,
          1
        ))
        this.setDaySelectState(true)
      } else if (this.typeMonth) {
        this.setDate(new Date(
          this.calendarDate.getFullYear(),
          monthIndex,
          1
        ))
        this.$emit('on-change', this.inputValue)
      }
    },
    setYear (year) {
      if (this.typeDate || this.typeMonth) {
        this.setCalendarDate(new Date(
          year,
          this.calendarDate.getMonth(),
          1
        ))
        this.setMonthSelectState(true)
      } else if (this.typeYear) {
        this.setDate(new Date(year, 0, 1))
        this.$emit('on-change', this.inputValue)
      }
    },
    yearListClasses (year) {
      return [
        'date-picker-year-list-item',
        {
          'date-picker-year-list-item-active': year === this.currentDate.getFullYear()
        }
      ]
    },
    monthListClasses (monthIndex) {
      return [
        'date-picker-month-list-item',
        {
          'date-picker-month-list-item-active': monthIndex === this.currentDate.getMonth()
        }
      ]
    },
    dayListClasses (date) {
      return [
        'date-picker-day-item',
        {
          'not-this-month': date.getMonth() !== this.calendarDate.getMonth()
        }
      ]
    },
    dateListClasses (date) {
      return [
        'date-picker-day-item-value',
        {
          'date-picker-day-item-value-active': date.toDateString() === this.currentDate.toDateString()
        }
      ]
    }
  }
}
</script>
<style scoped>
  .date-picker-button {
    position: absolute;
    right: 1px;
    top: 1px;
    bottom: 1px;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: #e8ecf0;
    border-radius: 0 5px 5px 0;
  }

  .date-picker {
    background: white;
    position: absolute;
    top: 50px;
    left: 0;
    width: 300px;
    height: 400px;
    border-radius: 5px;
    transform: scale(0);
    transition: 0.2s;
    opacity: 0;
    z-index: -1;
  }

  .date-picker .date-picker-header {
    padding: 16px;
    background: #5f84a7;
    color: white;
    height: 20%;
  }

  .date-picker .date-picker-header .date-picker-full-year {
    font-size: 14px;
  }

  .date-picker .date-picker-header .date-picker-full-date {
    font-size: 20px;
    padding: 10px 0;
    font-weight: bold;
  }

  .date-picker .date-picker-body {
    padding: 16px;
    position: relative;
    height: 80%;
  }

  .date-picker .date-picker-body .date-picker-year {
    height: 100%;
  }

  .date-picker .date-picker-body .date-picker-year .date-picker-year-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    height: 80%;
  }

  .date-picker .date-picker-body .date-picker-year .date-picker-year-list .date-picker-year-list-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    margin: 4px;
    padding: 5px;
    border-radius: 5px;
    border: 2px solid transparent;
    cursor: pointer;
  }

  .date-picker .date-picker-body .date-picker-year .date-picker-year-list .date-picker-year-list-item:hover {
    border-color: #5f84a7;
  }

  .date-picker .date-picker-body .date-picker-year .date-picker-year-list .date-picker-year-list-item-active {
    background: #5f84a7;
    color: white;
  }

  .date-picker .date-picker-body .date-picker-month {
    position: absolute;
    top: 100%;
    left: 100%;
    right: 0;
    bottom: 0;
    padding: 15px;
    transform: scale(0);
    transition: 0.2s;
    background: white;
  }

  .date-picker .date-picker-body .date-picker-month .date-picker-month-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    height: 80%;
  }

  .date-picker .date-picker-body .date-picker-month .date-picker-month-list .date-picker-month-list-item {
    margin: 4px;
    width: 30%;
    padding: 5px 0;
    border: 2px solid transparent;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.3s;
  }

  .date-picker .date-picker-body .date-picker-month .date-picker-month-list .date-picker-month-list-item:hover {
    border-color: #5f84a7;
  }

  .date-picker .date-picker-body .date-picker-month .date-picker-month-list .date-picker-month-list-item-active {
    background: #5f84a7;
    color: white;
  }

  .date-picker .date-picker-body .date-picker-month-active {
    top: 0;
    left: 0;
    transform: scale(1);
  }

  .date-picker .date-picker-body .date-picker-day {
    position: absolute;
    top: 100%;
    bottom: 0;
    right: 0;
    left: 100%;
    background: white;
    transform: scale(0);
    transition: 0.2s;
    padding: 15px;
  }

  .date-picker .date-picker-body .date-picker-day .date-picker-day-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .date-picker .date-picker-body .date-picker-day .date-picker-day-row .date-picker-day-item,
  .date-picker .date-picker-body .date-picker-day .date-picker-day-row .date-picker-day-header {
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    cursor: pointer;
    font-weight: bold;
  }

  .date-picker .date-picker-body .date-picker-day .date-picker-day-row .date-picker-day-item .date-picker-day-item-value,
  .date-picker .date-picker-body .date-picker-day .date-picker-day-row .date-picker-day-header .date-picker-day-item-value {
    padding: 10px;
    border-radius: 50%;
    border: 2px solid transparent;
    width: 90%;
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.3s;
  }

  .date-picker .date-picker-body .date-picker-day .date-picker-day-row .date-picker-day-item .date-picker-day-item-value:hover,
  .date-picker .date-picker-body .date-picker-day .date-picker-day-row .date-picker-day-header .date-picker-day-item-value:hover {
    border-color: #5f84a7;
  }

  .date-picker .date-picker-body .date-picker-day .date-picker-day-row .date-picker-day-item .date-picker-day-item-value-active,
  .date-picker .date-picker-body .date-picker-day .date-picker-day-row .date-picker-day-header .date-picker-day-item-value-active {
    background: #5f84a7;
    color: white;
  }

  .date-picker .date-picker-body .date-picker-day .date-picker-day-row .not-this-month {
    color: #cbcbcb;
  }

  .date-picker .date-picker-body .date-picker-day .date-picker-day-row .date-picker-day-header {
    opacity: 0.5;
  }

  .date-picker .date-picker-body .date-picker-day-active {
    top: 0;
    left: 0;
    transform: scale(1);
  }

  .date-picker .date-picker-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 0 15px;
  }

  .date-picker .date-picker-controls .date-picker-control-value {
    width: 200px;
    text-align: center;
    cursor: pointer;
  }

  .date-picker .date-picker-controls .date-picker-control-button {
    cursor: pointer;
  }

  .date-picker-active {
    transform: scale(1);
    opacity: 1;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);
    z-index: 3;
  }
</style>
