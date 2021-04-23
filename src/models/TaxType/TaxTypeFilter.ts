import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class TaxTypeFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
  public percentage?: NumberFilter = new NumberFilter();
  public statusId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
