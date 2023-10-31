import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { ProductsStateInterface } from './state';
import { Filter } from '../models';

const getters: GetterTree<ProductsStateInterface, StateInterface> = {
  discounts(state: ProductsStateInterface) {
    return (state.filteredProducts || []).filter(
      ({ discount_pc }) => parseInt(discount_pc) > 0
    );
  },
  productsByName(state: ProductsStateInterface) {
    return [...(state.filteredProducts || [])].sort(
      ({ title: titleA }, { title: titleB }) =>
        titleB.toUpperCase() > titleA.toUpperCase() ? -1 : 1
    );
  },
  productsByPrice(state: ProductsStateInterface) {
    return [...(state.filteredProducts || [])].sort(
      ({ price: priceA }, { price: priceB }) =>
        parseFloat(priceA) - parseFloat(priceB)
    );
  },
  productsByReviewStarsAZ(state: ProductsStateInterface) {
    return [...(state.filteredProducts || [])].sort(
      ({ reviewStarsAZ: reviewStarsA }, { reviewStarsAZ: reviewStarsB }) =>
        reviewStarsB - reviewStarsA
    );
  },
  productsByDiscount(state: ProductsStateInterface) {
    return [...(state.filteredProducts || [])].sort(
      ({ discount: discountA }, { discount: discountB }) =>
        parseFloat(discountB) - parseFloat(discountA)
    );
  },
  productsByDiscountPercent(state: ProductsStateInterface) {
    return [...(state.filteredProducts || [])].sort(
      ({ discount_pc: discountPCA }, { discount_pc: discountPCB }) =>
        parseFloat(discountPCB) - parseFloat(discountPCA)
    );
  },
  productsByAvailability(state: ProductsStateInterface) {
    return [...(state.filteredProducts || [])].sort(
      ({ itemAddedDate: itemAddedDateA }, { itemAddedDate: itemAddedDateB }) =>
        itemAddedDateA > itemAddedDateB ? -1 : 1
    );
  },
  productsByFilter(
    state: ProductsStateInterface,
    getters: GetterTree<ProductsStateInterface, StateInterface>
  ) {

    //console.log (String(state.outOfStock) + '-' + String(state.search) + '|' + String(state.filteredProducts?.length) + '/' + String(state.products?.length))

    switch (state.filter) {
      case Filter.Name:
        return getters.productsByName;
      case Filter.Price:  
        return getters.productsByPrice;
      case Filter.Review_Stars:
        return getters.productsByReviewStarsAZ;
      case Filter.Discount:
        return getters.productsByDiscount;
      case Filter.Discount_Percent:
        return getters.productsByDiscountPercent;
      case Filter.Availability:
        return getters.productsByAvailability;
      default:
        return state.filteredProducts;
    }
  },
};

export default getters;
