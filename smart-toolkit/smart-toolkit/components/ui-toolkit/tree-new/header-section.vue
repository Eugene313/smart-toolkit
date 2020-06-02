<template>
  <div class="tree-th-row">
    <div class="tree-th-col">
      <div class="button-col">
        <div class="item-checkbox" :class="{'check-box-hide': mode === 1}">
          <div class="hover-message">
            {{ hoverMessage }}
          </div>
          <div
            class="custom-checkbox"
            :class="{'custom-checkbox-active': allChecked}"
            @click="toggleAll"
          >
            <div class="check" />
          </div>
        </div>
        <div class="arrow-down" :class="{'tree-hide': !showTree}" @click="toggleTree">
          <Icon type="angle-down" />
        </div>
      </div>
      <div class="col-title">
        {{ title }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HeaderSection',
  props: {
    allChecked: {
      type: Boolean,
      default: false
    },
    showTree: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    mode: {
      type: Number,
      default: null
    }
  },
  computed: {
    hoverMessage () {
      return this.allChecked ? this.$t('deselectAll') : this.$t('SelectAll')
    }
  },
  methods: {
    toggleAll () {
      this.$emit('toggleAll')
    },
    toggleTree () {
      this.$emit('toggleTree')
    }
  }
}
</script>
<style scoped>
  .tree-th-row {
    position: relative;
    margin: 10px 0;
    background: #f4f6f5;
    display: flex;
    border: 1px solid white;
  }
  .tree-th-col {
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0;
    font-size: 12px;
    font-weight: bold;
    color: #7d7d7d;
    padding: 0 16px;
    min-height: 57px;
    border-left: 1px solid white;
    border-right: 1px solid white;
  }
  .button-col {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .arrow-down {
    margin: 0 5px;
    font-size: 22px;
    color: #014a90;
    cursor: pointer;
    transition: .5s;
  }
  .tree-hide {
    transform: rotateZ(-90deg);
  }
  .item-checkbox {
    position: relative;
  }
  .custom-checkbox {
    width: 19px;
    height: 19px;
    border: 1px solid #6ab42d;
    border-radius: 3px;
    padding: 1px;
    cursor: pointer;
  }
  .custom-checkbox .check {
    width: 100%;
    height: 100%;
    background: #6ab42d;
    border-radius: 2px;
    transform: scale(0);
    transition: 1s;
  }
  .custom-checkbox-active .check {
    transform: scale(1);
  }
  .check-box-hide {
    opacity: 0;
    z-index: -1;
  }
  .hover-message {
    opacity: 0;
    position: absolute;
    top: 30px;
    left: -50%;
    color: white;
    background: #6d8290;
    border-radius: 5px;
    padding: 10px 16px;
    z-index: -1;
    font-weight: 100;
    transition: .5s;
    line-height: 1.5em;
    width: max-content;
  }
  .hover-message:before {
    content: '';
    width: 10px;
    height: 10px;
    background: #6d8290;
    position: absolute;
    top: -5px;
    left: 12px;
    transform: rotateZ(45deg);
  }
  .item-checkbox:hover .hover-message {
    z-index: 5;
    opacity: 0.8;
  }
</style>
