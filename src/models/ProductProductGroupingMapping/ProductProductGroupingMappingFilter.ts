import { IdFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class ProductProductGroupingMappingFilter extends ModelFilter  {
  public productId?: IdFilter = new IdFilter();
  public productGroupingId?: IdFilter = new IdFilter();
}
