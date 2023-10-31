import { Product, Filter } from 'src/store/models';

export interface ProductsStateInterface {
  products: Product[] | null;
  filteredProducts: Product[] | null;
  loading: boolean;
  filter: Filter | null;
  outOfStock: boolean;
  search: string;
}

function state(): ProductsStateInterface {
  return {
    products: null,
    filteredProducts: null,
    loading: false,
    filter: Filter.Discount_Percent,
    outOfStock: false,
    search: '',
  };
}

export default state;
