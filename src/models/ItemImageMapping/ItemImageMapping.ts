import { Model } from '@react3l/react3l/core';
import { Image } from 'models/Image';
import { Item } from 'models/Item';

export class ItemImageMapping extends Model
{
    public itemId?: number;

    public imageId?: number;


    public image?: Image;

    public item?: Item;
}
