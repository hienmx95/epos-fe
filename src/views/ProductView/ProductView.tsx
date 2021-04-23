import React from 'react';
import { Switch } from 'react-router-dom';
import { PRODUCT_DETAIL_ROUTE, PRODUCT_MASTER_ROUTE, } from 'config/route-consts';

import './ProductView.scss';
import ProductMaster from './ProductMaster/ProductMaster';
import { ProtectedRoute, useCheckAuthorized } from 'config/protected-route';
import ProductDetail from './ProductDetail/ProductDetail';

function ProductView() {
  const { auth } = useCheckAuthorized();

  return (
    <Switch>
      <ProtectedRoute path={PRODUCT_MASTER_ROUTE} key={PRODUCT_MASTER_ROUTE} component={ProductMaster} auth={auth(PRODUCT_MASTER_ROUTE)} />
      <ProtectedRoute path={PRODUCT_DETAIL_ROUTE} key={PRODUCT_DETAIL_ROUTE} component={ProductDetail} auth={auth(PRODUCT_DETAIL_ROUTE)} />
    </Switch>
  );
}

export { ProductMaster };
export default ProductView;
