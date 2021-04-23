import { Model } from '@react3l/react3l/core';
import { Brand } from 'models/Brand';
import { Category } from 'models/Category';
import { Item } from 'models/Item';
import { ProductType } from 'models/ProductType';
import { Status } from 'models/Status';
import { Supplier } from 'models/Supplier';
import { TaxType } from 'models/TaxType';
import { UnitOfMeasure } from 'models/UnitOfMeasure';
import { UnitOfMeasureGrouping } from 'models/UnitOfMeasureGrouping';
import { UsedVariation } from 'models/UsedVariation';
import { VariationGrouping } from 'models/VariationGrouping';

export class Product extends Model
{
    public id?: number;

    public code?: string;

    public supplierCode?: string;

    public name?: string;

    public description?: string;

    public scanCode?: string;

    public eRPCode?: string;

    public categoryId?: number;

    public productTypeId?: number;

    public supplierId?: number;

    public brandId?: number;

    public unitOfMeasureId?: number;

    public unitOfMeasureGroupingId?: number;

    public salePrice?: number;

    public retailPrice?: number;

    public taxTypeId?: number;

    public statusId?: number;

    public otherName?: string;

    public technicalName?: string;

    public note?: string;

    public isNew?: boolean;

    public usedVariationId?: number;

    public used?: boolean;

    public rowId?: string;

    public brand?: Brand;

    public category?: Category;

    public productType?: ProductType;

    public status?: Status;

    public supplier?: Supplier;

    public taxType?: TaxType;

    public unitOfMeasure?: UnitOfMeasure;

    public unitOfMeasureGrouping?: UnitOfMeasureGrouping;

    public usedVariation?: UsedVariation;
    public variationGroupings?: VariationGrouping[] = []
    public items?: Item[] = [];

}
