<template>
  <q-page class="row justify-evenly" style="align-content:start">
    <template v-if="!products">
      <q-inner-loading :showing="!products">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
    </template>
    <template v-else>
      <resume />
      <products>
        <products-item
          v-for="(product, index) in productsByFilter"
          :key="index"
          :product="product"
        />
      </products>
    </template>
  </q-page>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { Product } from 'src/store/models';
import { StateInterface } from '../store';
import Resume from 'components/Resume.vue';
import Products from 'components/Products.vue';
import ProductsItem from 'components/ProductsItem.vue';

export default defineComponent({
  name: 'PageIndex',
  components: {
    Resume,
    Products,
    ProductsItem,
  },
  setup() {
    const store = useStore();
    const $q = useQuasar();

    $q.bex.on('products', async (payload) => {
      var loadedProducts = 0;
      const { data: products } = payload as { data: Product[] };
      store.commit('products/toggleLoading', true);
      store.commit('products/setProducts', products);
      try {
        for (var i = 1; i <= 25; i++) {
          const { data: newProducts } = (await $q.bex.send(
            'fetchProducts'
          )) as {
            data: Product[];
          };
          if (!newProducts || newProducts.length==loadedProducts) break;
          console.log ('Preload ' + String(i) + ': ' + String(newProducts.length-loadedProducts) + ' new products (' + String(loadedProducts) + '/' + String(newProducts.length) + ')' );
          loadedProducts = newProducts.length;
          store.commit('products/setProducts', newProducts);
        }
      } finally {
        store.commit('products/toggleLoading', false);
      }
    });

    return {
      products: computed(
        () => (store.state as StateInterface).products.filteredProducts
      ),
      productsByFilter: computed(
        () =>
          (store.getters as { 'products/productsByFilter': Product[] })[
            'products/productsByFilter'
          ]
      ),
    };
  },
});

</script>
