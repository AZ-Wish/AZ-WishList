import { MutationTree } from 'vuex';
import { Product, Filter } from 'src/store/models';
import { ProductsStateInterface } from './state';

const mutation: MutationTree<ProductsStateInterface> = {
  setProducts(state: ProductsStateInterface, products: Product[]) {
    state.products = products;
    state.filteredProducts = products;
    //console.log ('Prods:' + String(state.filteredProducts.length) +'/'+ String(products.length))
    if (!state.products.length) state.products = []
    if (!state.filteredProducts.length) {
      state.filteredProducts = []
    }
    else {
      FilterProducts (state);
    }
  },
  toggleLoading(state: ProductsStateInterface, loading: boolean) {
    state.loading = loading ?? !state.loading;
  },
  setOutOfStock(state: ProductsStateInterface, outOfStock: boolean) {
    if (state.outOfStock != outOfStock) {
      state.outOfStock = outOfStock;
      FilterProducts (state) 
    }
  },
  setSearch(state: ProductsStateInterface, search: string) {
    if (state.search != search) {
      state.search = search;
      FilterProducts (state) 
    }  
  },
  setFilter(state: ProductsStateInterface, filter: Filter) {
    state.filter = state.filter === filter ? null : filter;
  },
};


function FilterProducts(state: ProductsStateInterface){
  state.filteredProducts = (state.products || []).filter(
    ({ title, description }) => title.toLowerCase().includes(state.search.toLowerCase()) || description.toLowerCase().includes(state.search.toLowerCase())
  );

  if (!state.outOfStock) { //filtrar agotados
    state.filteredProducts = (state.filteredProducts || []).filter(
      ({ agotado }) => !agotado
    ); 
  }

}

export default mutation;
