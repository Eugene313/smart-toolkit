import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations('breadCrumbs', ['setBreadCrumbs'])
  },
  created () {
    this.setBreadCrumbs(this.breadCrumbs || [])
  }
}
