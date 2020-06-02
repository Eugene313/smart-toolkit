<template>
  <div class="smt-bread-crumbs">
    <span
      v-for="(breadCrumb, breadCrumbIndex) in breadCrumbs"
      :key="breadCrumb.Title"
      class="smt-bread-crumbs-item"
      :class="{'smt-bread-crumbs-item-last': breadCrumbIndex === breadCrumbs.length - 1}"
    >
      <nuxt-link
        v-if="breadCrumb.To"
        :to="{ path: localePath(breadCrumb.To) }"
      >
        {{ $t(breadCrumb.Title) }}
        <span
          v-if="breadCrumbIndex !== breadCrumbs.length - 1"
          class="smt-bread-crumbs-item-slash"
        >
          /
        </span>
      </nuxt-link>
      <a
        v-else-if="breadCrumb.Link"
        :href="breadCrumb.Link"
        :aria-label="$t(breadCrumb.Title)"
      >
        {{ $t(breadCrumb.Title) }}
        <span
          v-if="breadCrumbIndex !== breadCrumbs.length - 1"
          :class="{'smt-bread-crumbs-item-last': breadCrumbIndex === breadCrumbs.length - 1}"
        >
          /
        </span>
      </a>
      <span
        v-else
        class="smt-bread-crumbs-item-title"
      >
        {{ $t(breadCrumb.Title) }}
        <span
          v-if="breadCrumbIndex !== breadCrumbs.length - 1"
          :class="{'smt-bread-crumbs-item-last': breadCrumbIndex === breadCrumbs.length - 1}"
        >
          /
        </span>
      </span>
    </span>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  name: 'BreadCrumbs',
  computed: {
    ...mapState('breadCrumbs', ['breadCrumbs'])
  }
}
</script>
<style lang="sass">
.smt-bread-crumbs
  padding: 15px 0
  max-width: 1200px
  margin: 0 auto
  .smt-bread-crumbs-item
    a
      color: #495060
      text-decoration: none
  .smt-bread-crumbs-item-last
    a
      color: #858585
  .smt-bread-crumbs-item-slash
    color: #DDDEE1
    margin: 0 5px
</style>
