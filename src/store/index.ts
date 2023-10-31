import { store } from 'quasar/wrappers';
import { createStore } from 'vuex';

import products from './products';
import { ProductsStateInterface } from './products/state';

export interface StateInterface {
  products: ProductsStateInterface;
}

export default store(function (/* { ssrContext } */) {
  const Store = createStore<StateInterface>({
    modules: {
      products,
    },

    strict: !!process.env.DEBUGGING,
  });

  return Store;
});
