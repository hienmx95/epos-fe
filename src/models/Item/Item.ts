import { Model } from '@react3l/react3l/core';
import { Image } from 'models/Image';
import { Product } from 'models/Product';
import { Status } from 'models/Status';

export class Item extends Model
{
    public id?: number;

    public image?: Image;

    public productId?: number;

    // public categoryId?: number;

    // public category: Category;

    public code?: string;

    public name?: string;

    public description?: string;

    public scanCode?: string;

    public salePrice?: number;

    public retailPrice?: number;

    public statusId?: number;

    public used?: boolean;

    public rowId?: string;

    public product?: Product;

    public status?: Status;

    public isChecked?: boolean;

}
