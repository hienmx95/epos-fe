import { Model } from '@react3l/react3l/core';
import { VariationGrouping } from 'models/VariationGrouping';

export class Variation extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public variationGroupingId?: number;




    public rowId?: string;

    public used?: boolean;


    public variationGrouping?: VariationGrouping;
}
