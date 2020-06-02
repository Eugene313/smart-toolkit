<template>
  <div class="tree-new">
    <searchSection
      v-model="modelTree"
      :url="url"
      :mode="mode"
      :value-length="value.length"
      :all-expanded="allExpanded"
      :tree-length="searchCounter"
      @showCheckedItems="showCheckedItems"
      @updateTree="searchSelected"
    />
    <headerSection
      :all-checked="allChecked"
      :title="title"
      :show-tree="showTree"
      :mode="mode"
      @toggleAll="toggleAll"
      @toggleTree="toggleTree"
    />
    <div v-if="modelTree.length && showTree" ref="simpleBar" style="max-height: 400px;overflow-y: scroll">
      <treeRow
        v-for="(item, index) in modelTree"
        ref="tree"
        :key="index"
        :item="item"
        :level="0"
        :index="index"
        :last="item === modelTree[modelTree.length - 1]"
        :mode="mode"
        @toggleExpanded="toggleExpanded"
        @toggleItem="toggleItem"
        @showCheckedItems="showCheckedItems"
      />
    </div>
    <tagsSection :linear-model-tree="Object.values(linearModelTree)" @uncheckItem="toggleItem" />
  </div>
</template>
<script>
import searchSection from '~/components/ui-toolkit/tree-new/search-section.vue'
import treeRow from '~/components/ui-toolkit/tree-new/tree-row.vue'
import headerSection from '~/components/ui-toolkit/tree-new/header-section.vue'
import tagsSection from '~/components/ui-toolkit/tree-new/tags-section.vue'

export default {
  name: 'TreeNew',
  components: {
    searchSection,
    treeRow,
    headerSection,
    tagsSection
  },
  props: {
    mode: {
      type: Number,
      default: 4
    },
    value: {
      type: [Array, String],
      default: () => ([])
    },
    url: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      modelTree: [],
      linearModelTree: {},
      searchCounter: 0,
      showTree: true
    }
  },
  computed: {
    allChecked () {
      if (!this.modelTree.length) {
        return false
      }
      return this.modelTree.every(item => item.state.checked === true)
    },
    allExpanded () {
      if (!this.modelTree.length) {
        return false
      }
      return this.modelTree.every(item => !item.state.expanded)
    }
  },
  methods: {
    getSelectedItems () {
      const selectedTree = Object.values(this.linearModelTree).filter(item => item.state.checked === true)
      const result = []
      for (let i = 0; i < selectedTree.length; i++) {
        result.push({
          Id: selectedTree[i].id,
          Title: selectedTree[i].title
        })
      }
      return result
    },
    toggleTree () {
      this.showTree = !this.showTree
    },
    toggleAll () {
      const checked = !this.allChecked
      const result = []
      for (const item in this.linearModelTree) {
        this.linearModelTree[item].state.checked = checked
        if (checked) {
          result.push(this.linearModelTree[item].id)
        }
      }
      this.$emit('input', result)
    },
    searchSelected () {
      this.searchCounter = 0
      let children = this.modelTree
      while (children.length > 0) {
        children = children.reduce((total, item) => {
          this.searchCounter++
          this.linearModelTree[item.id] = item
          if (item.children) {
            item.children.forEach(child => total.push(child))
          }
          return total
        }, [])
      }
      this.value.forEach((item) => {
        if (this.linearModelTree[item]) {
          this.linearModelTree[item].state.checked = true
        }
      })
    },
    showCheckedItems (inputValue) {
      if (this.modelTree.length && this.allExpanded && inputValue) {
        this.$refs.tree.forEach((item) => {
          item.showChildren()
        })
      } else if (this.modelTree.length) {
        for (const item in this.linearModelTree) {
          if (this.linearModelTree[item].state.expanded) {
            this.linearModelTree[item].state.expanded = false
          }
        }
      }
    },
    toggleItem (item) {
      let resultIds = []
      resultIds.push(item.id)
      item.state.checked = !item.state.checked
      if (item.state.checked && item.children) {
        item.state.expanded = true
      }
      if (this.mode === 1) {
        for (const key in this.linearModelTree) {
          if (this.linearModelTree[key] !== item && this.linearModelTree[key].state.checked === true) {
            this.linearModelTree[key].state.checked = false
          }
        }
      }
      if (item.children && (this.mode === 3 || this.mode === 4)) {
        let node = item.children
        while (node.length > 0) {
          // eslint-disable-next-line no-loop-func
          node = node.reduce((total, child) => {
            child.state.checked = item.state.checked
            resultIds.push(child.id)
            if (child.children) {
              child.children.forEach(c => total.push(c))
            }
            return total
          }, [])
        }
      }
      if (item.parentId && this.mode === 4) {
        let parent = this.linearModelTree[item.parentId]
        while (parent) {
          parent.state.checked = !!parent.children.every(child => child.state.checked === true)
          parent = this.linearModelTree[parent.parentId]
        }
      }
      if (item.state.checked) {
        let parent = this.linearModelTree[item.parentId]
        while (parent) {
          if (parent.state.checked) {
            resultIds.push(parent.id)
          }
          parent = this.linearModelTree[parent.parentId]
        }
      } else if (!item.state.checked && this.mode === 4) {
        let parent = this.linearModelTree[item.parentId]
        while (parent) {
          resultIds.push(parent.id)
          parent = this.linearModelTree[parent.parentId]
        }
      }
      this.handleInput(resultIds, item.state.checked)
      resultIds = []
    },
    handleInput (resultIds, checked) {
      let newValue = {}
      if (this.mode === 1) {
        const first = resultIds[0]
        newValue[first] = first
      } else {
        for (const id of this.value) {
          newValue[id] = id
        }
        if (checked) {
          resultIds.forEach((id) => {
            if (newValue[id] === undefined) {
              newValue[id] = id
            }
          })
        } else {
          resultIds.forEach((id) => {
            if (newValue[id]) {
              delete newValue[id]
            }
          })
        }
      }
      this.$emit('input', Object.values(newValue))
      resultIds = []
      newValue = {}
    },
    toggleExpanded (item) {
      item.state.expanded = !item.state.expanded
      if (!item.state.expanded && item.children) {
        let node = item.children
        while (node.length > 0) {
          node = node.reduce((total, child) => {
            child.state.expanded = false
            if (child.children) {
              child.children.forEach(c => total.push(c))
            }
            return total
          }, [])
        }
      }
    }
  },
  render: {
    resourceHints: false
  }
}
</script>
<style>
  .tree-new {
    margin: 10px 0;
    width: 100%;
    padding: 15px;
    background: white;
    border-radius: 5px;
  }
</style>
