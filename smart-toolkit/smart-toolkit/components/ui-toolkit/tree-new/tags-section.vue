<template>
  <div class="tags-section">
    <div class="line-tree">
      <div v-for="(item, index) in topItems" :key="index" class="tag">
        <p v-html="item.title" />
        <div class="close" @click="uncheckItem(item)">
          <Icon type="plus-circle" />
        </div>
      </div>
      <div v-if="topItems.length > 9 && totalTags === 9" class="more" @click="showMoreTags">
        <div class="down">
          <Icon type="angle-down" />
        </div>
        Розгорнути ще 10
      </div>
      <div v-else-if="topItems.length > 10 && totalTags > 0" class="more more-hide" @click="hideTags">
        <div class="down">
          <Icon type="angle-up" />
        </div>
        Згорнути
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TagsSection',
  props: {
    linearModelTree: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      totalTags: 9
    }
  },
  computed: {
    topItems () {
      return this.linearModelTree.filter(item => item.state.checked === true).filter((item, index) => index < this.totalTags)
    }
  },
  methods: {
    uncheckItem (item) {
      this.$emit('uncheckItem', item)
    },
    showMoreTags () {
      this.totalTags += 10
    },
    hideTags () {
      this.totalTags -= 10
    }
  }
}
</script>
<style scoped>
  .tags-section {
    margin-top: 20px;
    border-top: 1px solid #ebebeb;
  }
  .line-tree {
    display: flex;
    flex-wrap: wrap;
  }
  .tag, .more {
    display: flex;
    align-items: center;
    width: fit-content;
    padding: 3px 10px;
    border-radius: 30px;
    background: #e1ebf4;
    margin: 5px;
  }
  .more {
    background: white;
    color: #014a90;
    box-shadow: 0 0 0 1px inset #014a90;
    font-size: 12px;
    padding: 0 8px;
    cursor: pointer;
  }
  .more-hide {
    padding: 0 13px 0 8px;

  }
  .close {
    margin-left: 3px;
    transform: rotateZ(45deg);
    color: #adc0d3;
    font-size: 13px;
    cursor: pointer;
    line-height: 0;
  }
  .close i {
    line-height: 0;
  }
  .down {
    font-size: 17px;
  }

</style>
