import { join } from "path";

export const ROOT_ROUTE: string = process.env.PUBLIC_URL;

export const LOGIN_ROUTE: string = '/login'; // login route, dont delete
export const FORBIDENT_ROUTE: string = '/403'; // forbident route, add project prefix if necessary
export const NOT_FOUND_ROUTE: string = '/404'; // notFounded route, add project prefix if necessary

export const PRODUCT_ROUTE: string = ROOT_ROUTE ? ROOT_ROUTE + '/product' : '/product';
export const PRODUCT_MASTER_ROUTE: string = join(
  PRODUCT_ROUTE,
  "product-master",
);
export const PRODUCT_DETAIL_ROUTE: string = join(
  PRODUCT_ROUTE,
  "product-detail",
);