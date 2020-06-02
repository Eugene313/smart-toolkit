<template>
  <section class="layout-footer-contacts">
    <div class="layout-footer-contacts-wrap">
      <div class="layout-footer-contacts-logo">
        <nuxt-link :to="localePath('/')">
          <img
            src="~/static/images/logo/smarttender-logo.svg"
            alt="smarttenderlogo"
          >
        </nuxt-link>
      </div>
      <div class="layout-footer-contacts-telephone">
        <Icon
          size="20"
          class="layout-footer-contacts-telephone-icon"
          type="phone-o"
        />
        <div class="layout-footer-contacts-telephone-info">
          <p
            v-for="phone in phones"
            :key="phone"
            class="layout-footer-contacts-telephone-info-number mb-10"
          >
            {{ phone }}
          </p>
          <p class="layout-footer-contacts-telephone-info-free mb-5">
            {{ $t('callsToUkraineAreFree') }}
          </p>
          <p class="layout-footer-contacts-telephone-info-time mb-20">
            {{ $t('timeWorking') }}
          </p>
          <Button
            color="success"
            :small="true"
          >
            {{ $t('ToOrderCall') }}
          </Button>
        </div>
      </div>
      <div class="layout-footer-contacts-messengers">
        <div class="layout-footer-contacts-messengers-list">
          <Icon
            size="31"
            type="viber"
            class="layout-footer-contacts-messengers-list-viber"
          />
          <Icon
            size="36"
            type="whatsapp"
            class="layout-footer-contacts-messengers-list-whats-app"
          />
          <Icon
            size="31"
            type="telegram"
            class="layout-footer-contacts-messengers-list-telegram"
          />
        </div>
        <div class="layout-footer-contacts-messengers-support mb-5">
          {{ $t('support') }}
        </div>
        <div class="layout-footer-contacts-messengers-support-email">
          info@smarttender.biz
        </div>
      </div>
      <div class="layout-footer-contacts-social">
        <p class="layout-footer-contacts-social-title mb-10">
          SmartTender {{ $t('inSocialNetworks').toLocaleLowerCase() }}:
        </p>
        <div class="layout-footer-contacts-social-list mb-10">
          <a
            href="https://www.youtube.com/channel/UCySANnqVeGF61FdxOgKyOOQ"
            target="_blank"
            aria-label="YouTube"
            rel="noopener"
          >
            <Icon
              size="23"
              type="youtube-play"
              class="layout-footer-contacts-social-list-youtube"
            />
          </a>
          <a
            href="https://www.facebook.com/smarttenders/?fref=ts"
            target="_blank"
            aria-label="FaceBook"
            rel="noopener"
          >
            <Icon
              size="23"
              type="facebook-square"
              class="layout-footer-contacts-social-list-facebook"
            />
          </a>
        </div>
        <div class="layout-footer-contacts-social-site-map">
          {{ $t('sitemap') }}
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'LayoutFooterContacts',
  data () {
    return {
      phones: [
        '+38 044 337 86 64',
        '+38 044 364 50 45',
        '0 800 75 10 10'
      ]
    }
  }
}
</script>
<style lang="sass">
  .layout-footer-contacts
    border-top: 1px solid #e8eaec
    border-bottom: 1px solid #e8eaec
    padding: 15px 0
    .layout-footer-contacts-wrap
      max-width: 1200px
      margin: 0 auto
      display: flex
      align-items: stretch
      .layout-footer-contacts-logo
        flex: 1
        img
          width: 225px
          height: 33.61px
      .layout-footer-contacts-telephone
        flex: 1
        display: flex
        align-items: flex-start
        .layout-footer-contacts-telephone-icon
          margin: 5px 15px 0 0
        .layout-footer-contacts-telephone-info
          margin-top: 5px
          .layout-footer-contacts-telephone-info-number
            font-size: 16px
          .layout-footer-contacts-telephone-info-free
            font-size: 14px
            color: #717171
          .layout-footer-contacts-telephone-info-time
            font-size: 14px
            color: #717171
      .layout-footer-contacts-messengers
        flex: 1
        .layout-footer-contacts-messengers-list
          display: flex
          align-items: center
        @mixin messengers-list
          padding: 10px
          cursor: pointer
        .layout-footer-contacts-messengers-list-viber
          @include messengers-list
          &:hover
            color: #57277e
        .layout-footer-contacts-messengers-list-whats-app
          @include messengers-list
          &:hover
            color: #4bd360
        .layout-footer-contacts-messengers-list-telegram
          @include messengers-list
          &:hover
            color: #3088ce
        .layout-footer-contacts-messengers-support
          font-size: 14px
          color: #727272
        .layout-footer-contacts-messengers-support-email
          font-size: 16px
          color: #4a4a4a
      .layout-footer-contacts-social
        flex: 1
        .layout-footer-contacts-social-list
          @mixin social-list
            margin-right: 10px
            cursor: pointer
          .layout-footer-contacts-social-list-youtube
            @include social-list
            &:hover
              color: #cb4631
          .layout-footer-contacts-social-list-facebook
            @include social-list
            &:hover
              color: #3f599a
</style>
