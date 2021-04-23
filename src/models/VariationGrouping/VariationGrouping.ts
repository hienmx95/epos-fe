import { Model } from '@react3l/react3l/core';
import { Product } from 'models/Product';
import { Variation } from 'models/Variation/Variation';

export class VariationGrouping extends Model
{
    public id?: number;
    public name?: string;

    public productId?: number;
    public rowId?: string;

    public used?: boolean;
    public product?: Product;
  public variations?: Variation[] = [];


}
