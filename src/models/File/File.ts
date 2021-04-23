import { Model } from '@react3l/react3l/core';
import { AppUser } from 'models/AppUser';

export class File extends Model
{
    public id?: number;

    public name?: string;

    public url?: string;

    public appUserId?: number;

    public extension?: string;

    public size?: number;

    public rowId?: string;

    public appUser?: AppUser;
}
