<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="header">
      <q-toolbar class="toolbar">
        <q-toolbar-title>
          <logo />
          <a href='https://github.com/AZ-Wish/AZ-WishList/releases' target='az' class='version'>v2.1</a>
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            anchor="bottom left"
            self="top left"
            :offset="[-15, 10]"
          >
            <B>AZwish List</B> v2.1<br/>
            Code by Oskar & Troglo<br/>
            Design by Humphrey<br/><br/>
            <i>Made witn Intelygenz</i>
          </q-tooltip>
        </q-toolbar-title>

        <div class="action-label">Return to Amazon</div>
        <q-btn
          :color="reloadColor"
          class="action"
          @mouseenter="reloadColor = 'primary'"
          @mouseleave="reloadColor = ''"
          @click="showAmazon"
          target="_blank"
          icon="img:icons/amazon-ico.svg"
          flat
          rounded
        >
        </q-btn>

        <div class="action-label">Reload Wish List</div>
        <q-btn
          :color="loading ? 'primary' : reloadColor"
          :loading="loading"
          :disable="loading"
          class="action"
          @mouseenter="reloadColor = 'primary'"
          @mouseleave="reloadColor = ''"
          @click="reloadWL"
          target="_blank"
          flat
          rounded
        >
          <q-icon name="refresh" />
        </q-btn>

        <q-input
          label="Search" 
          class="action-label"
          color="primary" 
          v-model="search"
          @keypress.enter="setSearch(search)"
          @mouseenter="reloadColor = 'primary'"
          @keyup="setSearch(search)"
          :disable="loading"
          rounded
          outlined
          dense
        />

        <q-checkbox
          name="outOfStock"
          label="Out of stock" 
          v-model="stock"
          @click="setOutOfStock(stock)"
          :disable="loading"
        />

        <div class="action-label">Sorted by:</div>
        <q-btn
          :color="filter != null ? 'primary' : filterColor"
          class="action"
          @mouseenter="filterColor = 'primary'"
          @mouseleave="filterColor = ''"
          @click="showingFilterMenu = !showingFilterMenu"
          target="_blank"
          flat
          rounded
        >
          <q-icon name="filter_alt" />
          <q-menu class="menu">
            <q-list style="min-width: 100px">
              <q-item
                clickable
                class="menu-item"
                :class="{ selected: filter == Filter.Name }"
                v-close-popup
                @click="setFilter(Filter.Name)"
              >
                <q-item-section>Product name</q-item-section>
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{ selected: filter == Filter.Review_Stars }"
                v-close-popup
                @click="setFilter(Filter.Review_Stars)"
              >
                <q-item-section>AZ score</q-item-section>
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{ selected: filter == Filter.Price }"
                v-close-popup
                @click="setFilter(Filter.Price)"
              >
                <q-item-section>Price</q-item-section>
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{ selected: filter == Filter.Discount }"
                v-close-popup
                @click="setFilter(Filter.Discount)"
              >
                <q-item-section>Discount (€)</q-item-section>
              </q-item>

              <q-item
                clickable
                class="menu-item"
                :class="{ selected: filter == Filter.Discount_Percent }"
                v-close-popup
                @click="setFilter(Filter.Discount_Percent)"
              >
                <q-item-section>Discount (%)</q-item-section>
              </q-item>
              <q-item
                clickable
                class="menu-item"
                :class="{ selected: filter == Filter.Availability }"
                v-close-popup
                @click="setFilter(Filter.Availability)"
              >
                <q-item-section>Availability</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { Filter } from 'src/store/models';
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useQuasar } from 'quasar';
import { StateInterface } from '../store';
import { Product } from 'src/store/models';
import Logo from 'components/Logo.vue';

export default defineComponent({
  name: 'MainLayout',
  components: {
    Logo,
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();

    const reloadColor = ref('');
    const filterColor = ref('');
    const showingFilterMenu = ref(false);

    const showAmazon = async () => {
      console.log('Return to Amazon 1');
      const data = { key: 'az-wish-disabled', value: true };
      await $q.bex.send('storage.set', data);
      void $q.bex.send('showAmazon');
    };

    const reloadWL = async () => {
      console.log('Reload Wish List');
      store.commit('products/toggleLoading', true);
      try {
        const { data: newProducts } = (await $q.bex.send('fetchProducts')) as {
          data: Product[];
        };
        store.commit('products/setProducts', newProducts);
      } finally {
        store.commit('products/toggleLoading', false);
      }
    };

    return {
      Filter,
      reloadColor,
      filterColor,
      showingFilterMenu,
      showAmazon,
      reloadWL,
      setFilter: (filter: Filter) => store.commit('products/setFilter', filter),
      filter: computed(() => (store.state as StateInterface).products.filter),
      loading: computed(() => (store.state as StateInterface).products.loading),
      stock: ref(false),
      setOutOfStock: (stock: boolean) => store.commit('products/setOutOfStock', stock),
      search: ref(),
      setSearch: (search: string) => store.commit('products/setSearch', search),
    };
  },
});
</script>

<style scoped>
.header {
  height: 80px;
  padding: 19px 28px;
  background: #f5f5f5;
  color: #aaaaaa;
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 13px;
  filter: drop-shadow(5px 5px 20px rgba(174, 174, 192, 0.25));
}

.toolbar {
  min-height: 48px;
  padding: 0;
}

.action-label {
  margin-left: 20px;
}

.version {
    display: inline-block;
    vertical-align: top;
    padding-top: 23px;
    color: #aaaaaa;
    text-decoration: none;
    font-size: 12px;
}

.action {
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  margin: 0 0 0 1rem;
  background: white;
  border-radius: 1.25rem;
  box-shadow: -5px -5px 10px white, 5px 5px 10px rgba(47, 47, 88, 0.3),
    inset -2px -2px 4px rgba(0, 0, 0, 0.1), inset 2px 2px 4px white;

  padding: 0;
  /* border-radius: 30px; */
}
</style>
