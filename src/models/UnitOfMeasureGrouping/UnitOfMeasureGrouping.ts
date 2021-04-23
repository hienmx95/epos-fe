import { Model } from '@react3l/react3l/core';
import { Status } from 'models/Status';
import { UnitOfMeasure } from 'models/UnitOfMeasure';

export class UnitOfMeasureGrouping extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public description?: string;

    public unitOfMeasureId?: number;

    public statusId?: number;




    public used?: boolean;

    public rowId?: string;


    public status?: Status;

    public unitOfMeasure?: UnitOfMeasure;


}
