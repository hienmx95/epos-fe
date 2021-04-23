import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { Item } from 'models/Item';
import { AppUser } from 'models/AppUser';

export class ItemHistory extends Model
{
    public id?: number;

    public itemId?: number;

    public time?: Moment;

    public modifierId?: number;

    public oldPrice?: number;

    public newPrice?: number;


    public item?: Item;

    public modifier?: AppUser;
}
