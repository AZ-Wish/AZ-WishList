import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ProductsStateInterface } from './state';

const actions: ActionTree<ProductsStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default actions;
