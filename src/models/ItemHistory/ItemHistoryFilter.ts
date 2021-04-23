import { IdFilter  } from '@react3l/advanced-filters';
import { NumberFilter  } from '@react3l/advanced-filters';
import { DateFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class ItemHistoryFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public itemId?: IdFilter = new IdFilter();
  public time?: DateFilter = new DateFilter();
  public modifierId?: IdFilter = new IdFilter();
  public oldPrice?: NumberFilter = new NumberFilter();
  public newPrice?: NumberFilter = new NumberFilter();
}
