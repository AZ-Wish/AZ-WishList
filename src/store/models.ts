export interface Product {
  n: number;
  id: string;
  moneda: string;
  discount: string;
  discount_pc: string;
  image: string;
  itemAddedDateStr: string;
  itemAddedDate: Date;
  link: string;
  price: string;
  title: string;
  description: string;
  agotado?: boolean;
  reviewStars: string;
  reviewCount: string;
  reviewStarsAZ: number;
  prime?: boolean;
  priceDrop: string;
  deliveryBadge: string;
}
/*
            <span data-csa-c-element-id="list-desktop-wishlist-item-info-delivery-badge" data-csa-c-element-type="navigational" data-csa-c-item-id="B00F9H25KW" data-csa-c-type="uxElement" class="wl-item-delivery-badge" data-csa-c-id="yc8oz1-k8e2u9-8trz51-2b8m2m">
                    <span class="a-color-secondary a-size-base">+ €12.99
 delivery</span>

            </span>
----------------------------------
                    <div class="a-row itemPriceDrop">
            <span id="itemPriceDrop_I19DX2OSFBXSAG" data-csa-c-element-id="list-desktop-wishlist-item-info-price-drop" data-csa-c-element-type="navigational" data-csa-c-item-id="B00F9H25KW" data-csa-c-type="uxElement" class="a-text-bold" data-csa-c-id="q7wscz-efkati-8wlwtn-8ki7sb">
                Price dropped 44%
            </span>

                <span class="a-letter-space"></span>
                <span>
                    (was €18.99 when added to List)
                </span>

        </div>
*/

export enum Filter {
  Name,
  Review_Stars,
  Price,
  Discount,
  Discount_Percent,
  Availability,
}
