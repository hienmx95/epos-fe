import { Model } from '@react3l/react3l/core';
import { Status } from 'models/Status';

export class TaxType extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public percentage?: number;

    public statusId?: number;




    public used?: boolean;

    public rowId?: string;


    public status?: Status;






}
