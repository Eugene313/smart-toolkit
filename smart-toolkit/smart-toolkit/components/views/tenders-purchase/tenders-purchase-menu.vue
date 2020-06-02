<template>
  <div class="prozorro-tender-purchase-header-menu">
    <div class="menu-category">
      <div
        v-for="category in categories"
        :key="category.id"
      >
        <nuxt-link
          v-if="category.to"
          :to="{ path: localePath(category.to)}"
          class="menu-category-item"
          :class="{'menu-category-item-active': segment === category.segment}"
        >
          <Icon
            class="menu-category-item-ico"
            :type="category.ico"
            size="25"
          />
          <span class="menu-category-item-title">
            {{ $t(category.title) }}
          </span>
        </nuxt-link>
        <a
          v-else
          class="menu-category-item"
          :class="{'menu-category-item-active': segment === category.segment}"
          :href="category.path[locale]"
        >
          <Icon
            class="menu-category-item-ico"
            :type="category.ico"
            size="16"
          />
          <span class="menu-category-item-title">
            {{ $t(category.title) }}
          </span>
        </a>
      </div>
    </div>
    <div class="menu-subcategory">
      <div
        v-for="subcategory in currentCategory.subcategories"
        :key="subcategory.title"
      >
        <nuxt-link
          v-if="subcategory.to"
          class="menu-subcategory-item"
          :to="{ path: localePath(subcategory.to)}"
        >
          <Radio
            class="menu-subcategory-item-radio"
            :value="subcategory.segment === segment"
          />
          <span>
            {{ $t(subcategory.title) }}
          </span>
        </nuxt-link>
        <a
          v-else
          class="menu-subcategory-item"
          :href="subcategory.path[locale]"
        >
          <Radio
            class="menu-subcategory-item-radio"
            :value="subcategory.segment === segment"
          />
          <span>
            {{ $t(subcategory.title) }}
          </span>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'TenderPurchaseMenu',
  data () {
    return {
      segment: 3,
      testValue: false,
      categories: [
        {
          id: 0,
          title: 'commercialZakupki',
          path: {
            uk: '/komertsiyni-torgy/',
            ru: '/ru/kommercheskie-torgi/',
            en: '/en/commercial-trades/'
          },
          ico: 'commercial-zakupki',
          segment: 1
        },
        {
          id: 1,
          title: 'PROZORRO',
          to: 'prozorro-tender-purchase',
          ico: 'prozorro',
          segment: 3,
          subcategories: [
            {
              id: 0,
              title: 'purchased',
              path: {
                uk: '/publichni-zakupivli-prozorro/',
                ru: '/ru/publichnye-zakupki-prozorro/',
                en: '/en/public-procurements-prozorro/'
              },
              segment: 3
            },
            {
              id: 1,
              title: 'plans',
              path: {
                uk: '/publichni-zakupivli-prozorro-plany/',
                ru: '/ru/publichnye-zakupki-prozorro-plany/',
                en: '/en/public-procurements-prozorro-plans/'
              }
            },
            {
              id: 2,
              title: 'contracts',
              path: {
                uk: '/publichni-zakupivli-prozorro-dogovory/',
                ru: '/ru/publichnye-zakupki-prozorro-dogovory/',
                en: '/en/public-procurements-prozorro-contracts/'
              }
            },
            {
              id: 3,
              title: 'agreement',
              path: {
                uk: '/agreements/',
                ru: '/ru/agreements/',
                en: '/en/agreements/'
              }
            }
          ]
        },
        {
          id: 2,
          title: 'ProZorro Market',
          path: {
            uk: '/prozorro-market/',
            ru: '/ru/prozorro-market/',
            en: '/en/prozorro-market/'
          },
          ico: 'e-catalog'
        },
        {
          id: 3,
          title: 'dgfTenders',
          path: {
            uk: '/auktsiony-na-prodazh-aktyviv-bankiv/',
            ru: '/ru/auktsiony-na-prodazhu-aktivov-bankov/',
            en: '/en/auctions-of-bank-assets/'
          },
          ico: 'bank'
        },
        {
          id: 4,
          title: 'spfTenders',
          path: {
            uk: '/auktsiony-na-prodazh-aktyviv-derzhpidpryemstv/',
            ru: '/ru/auktsiony-na-prodazhu-aktivov-gospredpriyatiy/',
            en: '/en/auctions-of-government-assets/'
          },
          ico: 'prozorro-sale'
        }
      ]
    }
  },
  computed: {
    locale () {
      return this.$i18n.locale
    },
    currentCategory () {
      return this.categories.find(category => category.segment === this.segment)
    }
  }
}
</script>
<style lang="sass">
  .prozorro-tender-purchase-header-menu
    margin-bottom: 8px
    .menu-category
      padding: 0 25px
      display: flex
      border-bottom: 1px solid #EBEBEB
      .menu-category-item
        padding: 15px 0 13px
        margin-right: 30px
        border-bottom: 4px solid transparent
        display: flex
        align-items: center
        justify-content: center
        text-decoration: none
        .menu-category-item-ico
          margin-right: 6px
          line-height: 10px
        .menu-category-item-title
          font-size: 16px
          color: #4A4A4A
      .menu-category-item-active
        border-bottom: 4px solid #6AB42D
        .menu-category-item-ico
          color: #6AB42D
        .menu-category-item-title
          font-weight: bold
          color: #6AB42D
    .menu-subcategory
      display: flex
      align-items: center
      padding: 0 25px
      .menu-subcategory-item
        display: flex
        justify-content: center
        align-items: center
        padding: 8px 0
        font-size: 14px
        color: #4A4A4A
        text-decoration: none
        margin-right: 30px
        .menu-subcategory-item-radio
          margin-right: 6px
</style>
