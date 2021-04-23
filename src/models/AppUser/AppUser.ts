import { Model } from '@react3l/react3l/core';
import { Moment } from 'moment';
import { Organization } from 'models/Organization';
import { Position } from 'models/Position';
import { Province } from 'models/Province';
import { Sex } from 'models/Sex';
import { Status } from 'models/Status';

export class AppUser extends Model
{
    public id?: number;

    public username?: string;

    public displayName?: string;

    public address?: string;

    public email?: string;

    public phone?: string;

    public sexId?: number;

    public birthday?: Moment;

    public avatar?: string;

    public positionId?: number;

    public department?: string;

    public organizationId?: number;

    public provinceId?: number;

    public longitude?: number;

    public latitude?: number;

    public statusId?: number;




    public gPSUpdatedAt?: Moment;

    public rowId?: string;


    public organization?: Organization;

    public position?: Position;

    public province?: Province;

    public sex?: Sex;

    public status?: Status;





















}
