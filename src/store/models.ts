export interface Product {
  n: number;
  id: string;
  moneda: string;
  discount: string;
  discount_pc: string;
  image: string;
  itemAddedDate: string;
  link: string;
  price: string;
  title: string;
  agotado?: boolean;
  reviewStars: string;
  reviewCount: string;
  reviewStarsAZ: number;
}

export enum Filter {
  Name,
  Price,
  Review_Stars,
  Discount,
  Discount_Percent,
  Availability,
}
