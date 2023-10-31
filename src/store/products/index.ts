import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { ProductsStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const products: Module<ProductsStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default products;
