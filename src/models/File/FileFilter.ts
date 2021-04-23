import { StringFilter  } from '@react3l/advanced-filters';
import { IdFilter  } from '@react3l/advanced-filters';
import { GuidFilter  } from '@react3l/advanced-filters';
import { ModelFilter } from '@react3l/react3l/core';

export class FileFilter extends ModelFilter  {
  public id?: IdFilter = new IdFilter();
  public name?: StringFilter = new StringFilter();
  public url?: StringFilter = new StringFilter();
  public appUserId?: IdFilter = new IdFilter();
  public rowId?: GuidFilter = new GuidFilter();
}
