<template>
  <div 
    class="product-item row no-wrap items-center"
    :class="{ outOfStock: product.agotado }"
  >
    <div class="product-item-box-photo">
      <q-img
        class="product-item-box-image"
        :src="product.image"
        loading="lazy"
        spinner-color="white"
        height="84px"
        style="max-width: 121px"
        fit="contain"
      ></q-img>
    </div>
    <div class="product-item-box-separator"></div>
    <div
      class="
        col
        product-item-box-description-wrapper
        vertical-middle
        product-item-box-text
      "
      :class="{ disabled: product.agotado }"
    >
    <div class='product-item-box-title'>{{ product.title }}</div>
      <div class='product-item-box-description'>{{ product.description }}</div>

    </div>
    <div v-if="product.price" class="product-item-box-price text-right">
      <div
        class="product-item-box-price-discount"
        :class="{ disabled: product.agotado }"
      >
        <div
          style="
            padding-right: 15px;
            font-weight: bold;
            font-size: 24px;
            color: #333333;
          "
        >
          {{ product.price }}
          <span style="font-size: 20px; font-weight: normal">{{product.moneda}}</span>
          <div style="font-size: 12px; margin-right:14px"> {{ product.reviewStarsAZ.toFixed(1) }} 
            <IMG src="icons/icon-16x16_on.png" width="16" height="16" :title="'AZwish normalized score based on ' + product.reviewCount + ' reviews'" />
             | {{product.reviewStars}} ⭐
          </div>
        </div>
        <div class = "product-item-box-separator" />
        <div class = "product-item-box-price-discount__discount">
          <span style="color: #aaaaaa; font-size: 12px; line-height: 13px">Discount {{product.moneda}}</span>
          <span
            style="
              color: #aaaaaa;
              font-weight: bold;
              font-size: 20px;
              margin-left: 1px;
            "
          >
            {{ product.discount }}
          </span>
          <span
            class = "text-primary"
            :class = "product.discount!='0' ? 'text-primary' : 'noDeal'"
            style="font-weight: bold; font-size: 18px"
          > 
            ({{ product.discount_pc }}%)
          </span>
        </div>
      </div>
    </div>
    <q-btn
      color="primary"
      class="product-item-action"
      :class="{
        outstanding: parseFloat(product.discount) > 0,
        overdue: product.agotado,
      }"
      @click="openDetail(product.link)"
      target="_blank"
      flat
      rounded
    >
      <q-icon left name="visibility" />
      <div>View Product</div>
    </q-btn>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { defineComponent, PropType } from 'vue';
import { Product } from '../store/models';

export default defineComponent({
  name: 'ProductsItem',
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  setup() {
    const $q = useQuasar();
    const openDetail = (link: string) => {
      console.log ('openDetail');
      window.open(link, '_blank');
//      void $q.bex.send('openDetail', { link }); #1 why use Quasar port to open a tab? (that disconnect sometimes)
    };
    return { openDetail };
  },
});
</script>

<style scoped>
.product-item {
  position: relative;
  width: 100%;
  height: 90px;
  margin-bottom: 74px;
  padding-left: 0;

  background: #f0f0f3;
  box-shadow: -5px -5px 20px #ffffff, 5px 5px 20px rgba(174, 174, 192, 0.5);
  border-radius: 10px;
}
.product-item-action {
  width: 160px;
  height: 52px;
  background: #f0f0f3;
  box-shadow: -5px -5px 20px #ffffff, 5px 5px 20px rgba(174, 174, 192, 0.5);
  border-radius: 30px;
  position: absolute;
  top: 69px;
  right: 52px;
  text-transform: capitalize;
}
.product-item-action.overdue {
  color: #666 !important;
  background: #f0f0f3 !important;
}
.product-item-action.outstanding {
  color: #fff !important;
  background: #ff5a5f !important;
}

.product-item-box > * {
  display: table-cell;
}
.product-item-box-separator {
  width: 1px;
  height: 100%;
  background: #c3c9cd;
  opacity: 0.5;
  box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);
}
.product-item-box-photo {
  width: 128px;
  height: 90px;
  padding: 3px 3px 3px 4px;
}
.product-item-box-image {
  margin: 0;
}

.product-item-box-text {
  padding: 0 16px;
  font-family: Roboto;
  font-style: normal;
  font-weight: 300;
  line-height: 21px;
  align-items: center;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

.product-item-box-title {
  font-size: 18px;
  color: #333333;
  -webkit-line-clamp: 3;
}


.product-item-box-description {
  font-size: 12px;
  color: #808080;
  -webkit-line-clamp: 1;
}

.product-item-box-price {
  display: table;
  padding: 18px 23.66px 36px 18px;
  width: 346px;
}
.product-item-box-price-discount {
  display: table-row;
}
.product-item-box-price-discount > * {
  display: table-cell;
}
.product-item-box-price-discount__discount {
  width: 160.34px;
}

.outOfStock {
  opacity: 0.70;
}

.noDeal {
  visibility: hidden;
}

</style>
