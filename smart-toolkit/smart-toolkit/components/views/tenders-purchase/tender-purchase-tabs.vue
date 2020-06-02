<template>
  <div class="row-menu-new">
    <div
      ref="wrap"
      class="menu-items-wrap"
    >
      <div
        id="allItems"
        ref="allItems"
        class="all-items-width"
      >
        <div
          v-for="item in currentItems"
          :key="item.Index"
          class="menu-items"
          :class="{'menu-items-active': item.Active}"
          @click="changeStatus(item)"
        >
          {{ item.Title }}
          <p
            v-if="item.Count"
            class="item-count"
          >
            {{ item.Count }}
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="currentOtherItems.length"
      ref="other"
      class="menu-items-other"
      :class="{'menu-items-active': Other.Active}"
    >
      <div class="toggle-menu" />
      <Icon type="ellipsis-v" size="18" />
      {{ Other.Title }}
      <Icon
        type="angle-down"
        class="angle-down"
        :class="{'angle-down-active': ShowOther}"
        size="18"
      />
      <div
        class="toggle-menu"
        @click="showOtherMenu"
      />
    </div>
    <div
      v-if="ShowOther"
      class="other-wrap"
      :class="{'other-items-show': ShowOther}"
      @click="ShowOther = false"
    >
      <div class="other-items-wrap">
        <div
          v-for="item in currentOtherItems"
          :key="item.Index"
          class="other-item"
          :class="{'menu-items-active': item.Active}"
          @click="changeStatus(item)"
        >
          {{ item.Title }}
          <p
            v-if="item.Count"
            class="item-count"
          >
            {{ item.Count }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RowMenuNew',
  props: {
    itemsList: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      currentItems: [],
      currentOtherItems: [],
      ShowOther: false,
      count: 0
    }
  },
  computed: {
    Other () {
      let other = { Active: false, Title: this.$t('more') }
      for (let i = 0; i < this.currentOtherItems.length; i++) {
        if (this.currentOtherItems[i].Active === true) {
          other = this.currentOtherItems[i]
          break
        }
      }
      return other
    }
  },
  watch: {
    itemsList () {
      this.currentItems = []
      this.currentOtherItems = []
      this.count = 0
      this.currentItems.push(this.itemsList[this.count])
    }
  },
  updated () {
    this.$nextTick(() => {
      this.createMenuItems()
    })
    this.$nextTick(() => {
      if (this.$refs.wrap.clientWidth < this.$refs.allItems.clientWidth) {
        this.currentOtherItems.unshift(this.currentItems.pop())
      }
    })
  },
  mounted () {
    this.currentItems.push(this.itemsList[this.count])
    window.addEventListener('resize', () => {
      this.currentItems = []
      this.currentOtherItems = []
      this.count = 0
      this.currentItems.push(this.itemsList[this.count])
    })
  },
  methods: {
    showOtherMenu () {
      this.ShowOther = !this.ShowOther
      const outsideClickListener = (e) => {
        if (this.$refs.other !== e.target && this.ShowOther && !this.$refs.other.contains(e.target)) {
          this.ShowOther = false
          document.removeEventListener('click', outsideClickListener)
        }
      }
      document.addEventListener('click', outsideClickListener)
    },
    changeStatus (item) {
      this.ShowOther = false
      this.$emit('change', {
        Index: item.Index
      })
    },
    createMenuItems () {
      if (!this.currentOtherItems.length) {
        if (this.$refs.wrap.clientWidth > this.$refs.allItems.clientWidth) {
          this.count++
          if (this.itemsList[this.count]) {
            this.currentItems.push(this.itemsList[this.count])
          }
        } else {
          this.currentItems.splice(-1)
          this.currentOtherItems = this.itemsList.slice(this.count)
        }
      }
    }
  }
}
</script>

<style>
  .row-menu-new {
    position: relative;
    border-top: none;
    width: 100%;
    height: 46px;
    display: flex;
    background: white;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    padding: 5px 15px 0;
    border-radius: 6px;
    margin-bottom: 1px;
  }
  .menu-items-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
  }
  .all-items-width {
    position: absolute;
    top: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .menu-items, .menu-items-other {
    min-width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 5px 10px 0;
    border-bottom: 4px solid transparent;
    word-wrap: normal;
    line-height: 0;
  }
  .item-count {
    background: #c2c2c2;
    margin-left: 5px;
    padding: 0 6px;
    border-radius: 12px;
    color: #fff;
    font-size: 12px;
    min-width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0;
  }
  .menu-items:hover, .menu-items-other:hover {
    color: #6ab42d;
    cursor: pointer;
    transition: .5s;
  }
  .menu-items-active {
    color: #6ab42d;
    border-bottom: 4px solid #6ab42d;
    transition: .5s;
  }
  .menu-items-other {
    background: white;
    position: relative;
  }
  .other-wrap {
    box-shadow: 0 0 21px -11px #000000;
    position: absolute;
    top: 100%;
    right: 0;
    background: white;
    z-index: 100;
    padding: 10px 0;
  }
  .other-item {
    border-bottom: 2px solid transparent;
    min-width: 200px;
    min-height: 42px;
    padding: 10px;
    width: max-content;
    font-size: 12px;
    cursor: pointer;
    transition: .5s;
    display: flex;
    align-items: center;
    line-height: 0;
  }
  .other-item:hover {
    border-bottom: 2px solid #6ab42d;
    cursor: pointer;
  }
  .other-items-show {
    top: 100%;
    opacity: 1;
    animation: otherShow;
    animation-duration: .3s;
    animation-timing-function: linear;
  }
  .toggle-menu {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  @-webkit-keyframes otherShow {
    0% {
      top: 70%;
      opacity: 0;
    }
    100% {
      top: 100%;
      opacity: 1;
    }
  }
  .angle-down {
    transition: .5s;
  }
  .angle-down-active {
    transform: rotateZ(180deg);
  }
  @media(max-width: 400px) {
    .other-wrap {
      padding: 15px;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      position: fixed;
      background: #00000060;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .other-items-wrap {
      background: #ffffff;
      width: 100%;
      border-radius: 5px;
      padding: 20px;
    }
    .other-item {
      font-size: 15px;
      padding: 15px 10px;
    }
    @-webkit-keyframes otherShow {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
</style>
