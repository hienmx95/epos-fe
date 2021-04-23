import { Model } from "@react3l/react3l/core";
import { Image } from "models/Image";
import { Status } from "models/Status";

export class Category extends Model {
  public id?: number;

  public code?: string;

  public name?: string;

  public parentId?: number;

  public path?: string;

  public level?: number;

  public statusId?: number;

  public imageId?: number;

  public rowId?: string;

  public used?: boolean;

  public image?: Image;

  public parent?: Category;

  public status?: Status;

  public preifx?: string;
}
