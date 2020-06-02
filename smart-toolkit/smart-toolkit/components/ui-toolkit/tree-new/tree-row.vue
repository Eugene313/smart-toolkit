<template>
  <div>
    <div class="tree-wrap">
      <div v-if="level" class="v-line" :class="{'last-item': last && lastParent}" />
      <div class="row-wrap">
        <div class="tree-row" :class="{'row-active': item.state.checked === true, 'row-search': item.title.includes('<b>')}">
          <div class="tree-col">
            <div v-if="index" class="top-line" />
            <div v-if="level" class="h-line" />
            <div v-if="!last || item.state.expanded" class="bottom-line" />
            <div class="item-checkbox">
              <div
                class="custom-checkbox"
                :class="{'custom-checkbox-active': parentAndChildrenChecked, 'check-children': parentAndSomeChildren, 'check-children-parent': someChildrenWithoutParent}"
                @click="toggleItem(item)"
              >
                <div class="check" />
              </div>
            </div>
            <div
              v-if="item.children"
              class="arrow-down"
              :class="{'arrow-down-expanded': item.state.expanded}"
              @click="toggleExpanded(item)"
            >
              <Icon type="angle-down" />
            </div>
          </div>
          <div class="tree-col">
            <div class="description" v-html="item.title" />
          </div>
        </div>
        <div v-if="item.state.expanded">
          <treeRow
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
            ref="children"
            :item="child"
            :level="level + 1"
            :index="childIndex"
            class="show-tree-row"
            :last="child === item.children[item.children.length - 1]"
            :last-parent="last"
            :mode="mode"
            @toggleExpanded="toggleExpanded"
            @toggleItem="toggleItem"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TreeRow',
  props: {
    children: {
      type: Array,
      default: () => ([])
    },
    level: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      default: null
    },
    index: {
      type: Number,
      default: null
    },
    last: {
      type: Boolean,
      default: false
    },
    lastParent: {
      type: Boolean,
      default: false
    },
    mode: {
      type: Number,
      default: 3
    }
  },
  computed: {
    someChildrenChecked () {
      let checked = null
      let unchecked = null
      if (!this.item.children) {
        return false
      }
      let node = this.item.children
      while (node.length > 0) {
        const newNode = []
        // eslint-disable-next-line no-loop-func
        node.forEach((item) => {
          if (item.state.checked) {
            checked = true
          } else {
            unchecked = true
          }
          if (item.children) {
            item.children.forEach(child => newNode.push(child))
          }
        })
        node = newNode
      }
      return checked === true && unchecked === true
    },
    parentAndChildrenChecked () {
      if (this.mode === 1 && this.item.state.checked) {
        return true
      }
      if (this.item.state.checked && !this.item.children) {
        return true
      } if (this.item.state.checked && this.item.children.every(child => child.state.checked === true) && !this.someChildrenChecked) {
        return true
      }
      return false
    },
    parentAndSomeChildren () {
      if (this.mode === 1) {
        return false
      }
      if (this.item.state.checked && !this.item.children) {
        return false
      } if (this.item.state.checked && this.someChildrenChecked) {
        return true
      } if (this.item.state.checked && this.item.children.every(child => child.state.checked === false)) {
        return true
      }
      return false
    },
    someChildrenWithoutParent () {
      if (this.item.state.checked && !this.item.children) {
        return false
      } if (!this.item.state.checked && !this.item.children) {
        return false
      } if (!this.item.state.checked && this.someChildrenChecked) {
        return true
      } if (!this.item.state.checked && this.item.children.every(child => child.state.checked === true)) {
        return true
      }
      return false
    }
  },
  methods: {
    toggleItem (item) {
      this.$emit('toggleItem', item)
    },
    toggleExpanded (item) {
      this.$emit('toggleExpanded', item)
    },
    showChildren () {
      if (this.someChildrenChecked || this.item.state.checked) {
        this.item.state.expanded = true
        this.$nextTick(() => {
          if (this.$refs.children && this.$refs.children.length) {
            this.$refs.children.forEach((item) => {
              item.showChildren()
            })
          }
        })
      }
    }
  }
}
</script>
<style scoped>
  .tree-wrap {
    display: flex;
  }
  .row-wrap {
    width: 100%;
  }
  .tree-row {
    display: flex;
    box-shadow: inset 0 0 0 2px white;
    position: relative;
    width: 100%;
    padding: 5px 16px;
  }
  .row-search {
    background: #e0f0ff;
  }
  .row-active {
    background: #eef9e9;
  }
  .tree-col {
    display: flex;
    align-items: flex-start;
  }
  .arrow-down {
    margin-right: 5px;
    font-size: 22px;
    color: #014a90;
    cursor: pointer;
    transform: rotateZ(-90deg);
    transition: .5s;
    line-height: 1.1em;
  }
  .arrow-down i {
    line-height: 1.1em;
  }
  .arrow-down-expanded {
    transform: rotateZ(0deg);
  }
  .custom-checkbox {
    width: 19px;
    height: 19px;
    border: 1px solid #6ab42d;
    border-radius: 3px;
    padding: 1px;
    cursor: pointer;
    margin: 3px 5px 3px 0;
  }
  .custom-checkbox .check {
    width: 100%;
    height: 100%;
    background: #6ab42d;
    border-radius: 2px;
    transform: scale(0);
    transition: .3s;
  }
  .check-children {
    position: relative;
  }
  .check-children:before {
    content: '';
    position: absolute;
    padding: 1px;
    top: 7px;
    background: #f9f6f6;
    z-index: 2;
    left: 3px;
    right: 3px
  }
  .custom-checkbox-active .check {
    transform: scale(1);
  }
  .check-children .check {
    transform: scale(1);
  }
  .check-children-parent {
    position: relative;
  }
  .check-children-parent:before {
    content: '';
    position: absolute;
    padding: 1px;
    top: 7px;
    background: #6ab42d;
    z-index: 2;
    left: 3px;
    right: 3px
  }
  .check-children-parent .check {
    background: white;
  }
  .v-line {
    margin-left: 25px;
    border-right: 1px solid #c2c2c2;
  }
  .last-item {
    height: 18px;
  }
  .h-line {
    position: absolute;
    width: 14px;
    border-top: 1px solid #c2c2c2;
    left: 0;
    top: 17px;
  }
  .top-line {
    position: absolute;
    height: 9px;
    border-left: 1px solid #c2c2c2;
    top: 0;
    left: 25px;
  }
  .bottom-line {
    position: absolute;
    border-left: 1px solid #c2c2c2;
    bottom: 0;
    left: 25px;
    top: 27px;
  }
  .description {
    font-size: 12px;
    padding-top: 5px;
    line-height: 1.3em;
  }
</style>
