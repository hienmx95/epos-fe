import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PRODUCT_GROUPING_PREFIX } from "config/api-consts";
import { ProductGrouping, ProductGroupingFilter } from 'models/ProductGrouping';

export class ProductGroupingRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PRODUCT_GROUPING_PREFIX);
    }

    public count = (productGroupingFilter?: ProductGroupingFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), productGroupingFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (productGroupingFilter?: ProductGroupingFilter): Observable<ProductGrouping[]> => {
        return this.httpObservable.post<ProductGrouping[]>(kebabCase(nameof(this.list)), productGroupingFilter)
            .pipe(map((response: AxiosResponse<ProductGrouping[]>) => response.data));
    };

    public get = (id: number | string): Observable<ProductGrouping> => {
        return this.httpObservable.post<ProductGrouping>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<ProductGrouping>) => response.data));
    };

    public create = (productGrouping: ProductGrouping): Observable<ProductGrouping> => {
        return this.httpObservable.post<ProductGrouping>(kebabCase(nameof(this.create)), productGrouping)
            .pipe(map((response: AxiosResponse<ProductGrouping>) => response.data));
    };

    public update = (productGrouping: ProductGrouping): Observable<ProductGrouping> => {
        return this.httpObservable.post<ProductGrouping>(kebabCase(nameof(this.update)), productGrouping)
            .pipe(map((response: AxiosResponse<ProductGrouping>) => response.data));
    };

    public delete = (productGrouping: ProductGrouping): Observable<ProductGrouping> => {
        return this.httpObservable.post<ProductGrouping>(kebabCase(nameof(this.delete)), productGrouping)
            .pipe(map((response: AxiosResponse<ProductGrouping>) => response.data));
    };

    public save = (productGrouping: ProductGrouping): Observable<ProductGrouping> => {
        return productGrouping.id ? this.update(productGrouping) : this.create(productGrouping);
    };

    public singleListProductGrouping = (productGroupingFilter: ProductGroupingFilter): Observable<ProductGrouping[]> => {
        return this.httpObservable.post<ProductGrouping[]>(kebabCase(nameof(this.singleListProductGrouping)), productGroupingFilter)
            .pipe(map((response: AxiosResponse<ProductGrouping[]>) => response.data));
    };
    

    public bulkDelete = (idList: number[] | string[]): Observable<void> => {
        return this.httpObservable.post(kebabCase(nameof(this.bulkDelete)), idList)
            .pipe(map((response: AxiosResponse<void>) => response.data));
    };

    public import = (file: File, name: string = nameof(file)): Observable<void> => {
        const formData: FormData = new FormData();
        formData.append(name, file as Blob);
        return this.httpObservable.post<void>(kebabCase(nameof(this.import)), formData)
            .pipe(map((response: AxiosResponse<void>) => response.data));
    };

    public export = (filter: any): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post('export', filter, {
          responseType: 'arraybuffer',
        });
    };

    public exportTemplate = (): Observable<AxiosResponse<any>> => {
        return this.httpObservable.post('export-template', {}, {
          responseType: 'arraybuffer',
        });
    };
    
}

export const productGroupingRepository = new ProductGroupingRepository();
