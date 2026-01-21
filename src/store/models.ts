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
}

export enum Filter {
  Name,
  Review_Stars,
  Price,
  Discount,
  Discount_Percent,
  Availability,
}
