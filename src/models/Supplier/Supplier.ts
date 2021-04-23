import { Model } from '@react3l/react3l/core';
import { District } from 'models/District';
import { Nation } from 'models/Nation';
import { AppUser } from 'models/AppUser';
import { Province } from 'models/Province';
import { Status } from 'models/Status';
import { Ward } from 'models/Ward';

export class Supplier extends Model
{
    public id?: number;

    public code?: string;

    public name?: string;

    public taxCode?: string;

    public phone?: string;

    public email?: string;

    public address?: string;

    public provinceId?: number;

    public districtId?: number;

    public wardId?: number;

    public ownerName?: string;

    public personInChargeId?: number;

    public statusId?: number;

    public description?: string;




    public nationId?: number;

    public used?: boolean;

    public rowId?: string;


    public district?: District;

    public nation?: Nation;

    public personInCharge?: AppUser;

    public province?: Province;

    public status?: Status;

    public ward?: Ward;









}
