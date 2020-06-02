<template>
  <div class="header-contact">
    <span
      class="header-contact-phone"
      data-qa="header-contact-phone"
    >
      <Icon
        type="phone-o"
        size="22"
        class="header-phone-icon"
      />
      <a href="tel:0800751010" aria-label="0800751010">
        0 800 75 10 10
      </a>
    </span>
    <span
      class="write-to-us"
      data-qa="header-contact-write-to-us"
    >
      <a :aria-label="$t('writeToUs')">
        {{ $t('writeToUs') }}
      </a>
    </span>
  </div>
</template>
<script>
export default {
  name: 'HeaderContacts'
}
</script>
<style lang="sass">
.header-contact
  display: flex
  align-items: center
  .header-contact-phone
    display: flex
    align-items: center
    a
      text-decoration: none
      color: #36526c
      &:hover
        text-decoration: underline
        color: #2d8cf0
    .header-phone-icon
      margin-right: 5px
  .write-to-us
    margin: 0 10px
    a
      color: #0a8900
      text-decoration: none
      cursor: pointer
      &:hover
        text-decoration: underline
</style>
