<template>
  <div class="search-section">
    <div class="form-item">
      <input
        v-model="inputValue"
        type="text"
        class="input"
        placeholder="Введіть назву категорії, товару чи послуги, або код ДК"
        @input="debounce"
      >
      <div
        class="icon-wrap"
        :class="{'searchDown': buttonActive}"
        @click="getTreeModel"
        @mousedown="buttonActive = true"
        @mouseup="buttonActive = false"
      >
        <Icon ref="searchButton" type="search" class="icon" />
      </div>
    </div>
    <div v-if="searchDetected" class="result-search">
      Знайдено: {{ treeLength }} класифікацій
    </div>
    <div v-if="mode === 3" class="checkedItems">
      <div
        v-if="checkedItems"
        class="showCheckedItems"
        @click="showCheckedItems"
      >
        <Icon :type="arrowExpanded" />
        {{ allExpanded ? $t('expandSelected') : $t('collapseSelected') }}
      </div>
    </div>
  </div>
</template>
<script>
import Debounce from 'lodash/debounce'

export default {
  name: 'SearchSection',
  props: {
    url: {
      type: String,
      default: ''
    },
    value: {
      type: [Array, String],
      default: () => ({})
    },
    treeLength: {
      type: Number,
      default: 0
    },
    mode: {
      type: Number,
      default: null
    },
    allExpanded: {
      type: Boolean,
      default: true
    },
    valueLength: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      inputValue: '',
      buttonActive: '',
      searchDetected: false
    }
  },
  computed: {
    arrowExpanded () {
      return this.allExpanded ? 'angle-right' : 'angle-down'
    },
    checkedItems () {
      return this.treeLength && (this.valueLength || !this.allExpanded)
    }
  },
  mounted () {
    this.getTreeModel()
  },
  methods: {
    debounce: Debounce(function () {
      return this.getTreeModel()
    }, 600),
    getTreeModel () {
      let { url } = this
      if (this.inputValue) {
        const operator = url.indexOf('?') > 0 ? '&' : '?'
        url += `${operator}phrase=${this.inputValue}`
      }
      return new Promise((resolve) => {
        this.$api.get(url)
          .then((resp) => {
            this.searchDetected = !!this.inputValue
            this.$emit('input', resp.data)
            this.$emit('updateTree')
            resolve()
          })
      })
    },
    showCheckedItems () {
      const resultExpanded = this.allExpanded
      if (this.inputValue) {
        this.inputValue = ''
        this.getTreeModel().then(() => {
          this.$emit('showCheckedItems', resultExpanded)
        })
      } else {
        this.$emit('showCheckedItems', resultExpanded)
      }
    }
  }
}
</script>
<style>
  .search-section {
    width: 100%;
  }
  .form-item {
    width: 100%;
    position: relative;
  }
  .input {
    width: 100%;
    font-size: 16px;
    padding: 12px 56px 12px 19px;
    border: 1px solid #adc0d3;
    border-radius: 30px;
    line-height: 0;
  }
  .input:focus {
    outline: none;
  }
  .icon-wrap {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    top: 1px;
    right: 1px;
    bottom: 1px;
    background: linear-gradient(90deg, #014a90, #049079 48%, #3eab35);
    width: 42px;
    cursor: pointer;
    transition: .5s;
  }
  .icon-wrap:hover {
    box-shadow: 0 0 10px 0;
  }
  .icon {
    color: white;
    font-size: 22px;
  }
  .searchDown {
    transform: scale(0.8);
  }
  .result-search {
    padding: 10px 0;
    color: #4a4a4a;
    font-size: 17px;
    font-weight: 600;
  }
  .checkedItems {
    min-height: 23px;
    margin-top: 10px;
  }
  .showCheckedItems {
    max-width: fit-content;
    border: 1px solid #014a90;
    padding: 0px 10px;
    margin-left: 20px;
    border-radius: 30px;
    color: #014a90;
    cursor: pointer;
  }
</style>
