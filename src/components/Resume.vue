<template>
  <div class="resume">
    <strong class="text-primary">{{ discounts.length }} deals</strong> have been found for the
    <strong>{{ filteredProducts ? filteredProducts.length : 0 }} products</strong> on your Wish List at {{ currentDate }}
  </div>
</template>

<script lang="ts">
import { Product } from 'src/store/models';
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { StateInterface } from '../store';


export default defineComponent({
  data() {
    return {
      currentDate: new Date().toLocaleString(),
    };
  },
  name: 'Resume',
  setup() {
    const store = useStore();

    return {
      filteredProducts: computed(
        () => (store.state as StateInterface).products.filteredProducts
      ),
      discounts: computed(
        () =>
          (store.getters as { 'products/discounts': Product[] })[
            'products/discounts'
          ]
      ),
    };
  },
});
</script>

<style scoped>
.resume {
  margin: 3px 0 13px 0;
  height: 80px;
  width: 100%;
  text-align: center;
  padding: 30px 0 29px 0;
  background: linear-gradient(
    180deg,
    #f5f5f5 25%,
    rgba(255, 255, 255, 0) 92.71%
  );
  font-weight: 300;
  font-size: 18px;
  line-height: 21px;
  color: #333333;
}
strong {
  font-weight: 700;
}
</style>
