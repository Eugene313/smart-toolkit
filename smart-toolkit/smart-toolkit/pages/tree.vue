<template>
  <div class="smt-tree">
    <Tree
      v-model="currentValue"
      :url="'/ReferenceBook/GetSubscriptionClassification/?schemeType=' + 'Cpv'"
      :mode="3"
    />
  </div>
</template>
<script>
import Tree from '~/components/ui-toolkit/tree-new/tree-new.vue'

export default {
  components: {
    Tree
  },
  data () {
    return {
      currentValue: []
    }
  }
}
</script>
<style lang="sass">
.smt-tree
  display: flex
  justify-content: center
  width: 100%
</style>
