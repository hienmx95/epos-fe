// import React from "react";

import { PRODUCT_ROUTE } from 'config/route-consts';
import ProductView from 'views/ProductView/ProductView';

export interface Route {
    path: string;
    component: () => JSX.Element;
}

export const routes: Route[] =
    [

        {
            path: PRODUCT_ROUTE,
            component: ProductView,
        },

    ];
