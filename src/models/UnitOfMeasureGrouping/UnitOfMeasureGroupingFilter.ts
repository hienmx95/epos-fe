import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class UnitOfMeasureGroupingFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public code?: StringFilter = new StringFilter();
  public name?: StringFilter = new StringFilter();
  public description?: StringFilter = new StringFilter();
  public unitOfMeasureId?: IdFilter = new IdFilter();
  public statusId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
