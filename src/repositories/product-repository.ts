import { AxiosResponse } from 'axios';
import { Repository } from "@react3l/react3l/core";
import { kebabCase, url } from "@react3l/react3l/helpers";
import {httpConfig} from 'config/http';
import { BASE_API_URL } from "config/consts";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import nameof from "ts-nameof.macro";

import { API_PRODUCT_PREFIX } from "config/api-consts";
import { Product, ProductFilter } from 'models/Product';
import { Brand, BrandFilter } from 'models/Brand';
import { Category, CategoryFilter } from 'models/Category';
import { ProductType, ProductTypeFilter } from 'models/ProductType';
import { Status, StatusFilter } from 'models/Status';
import { Supplier, SupplierFilter } from 'models/Supplier';
import { TaxType, TaxTypeFilter } from 'models/TaxType';
import { UnitOfMeasure, UnitOfMeasureFilter } from 'models/UnitOfMeasure';
import { UnitOfMeasureGrouping, UnitOfMeasureGroupingFilter } from 'models/UnitOfMeasureGrouping';
import { UsedVariation, UsedVariationFilter } from 'models/UsedVariation';
import { ItemHistory, ItemHistoryFilter } from 'models/ItemHistory';
import { ProductGrouping, ProductGroupingFilter } from 'models/ProductGrouping';

export class ProductRepository extends Repository {
    constructor() {
        super(httpConfig);
        this.baseURL = url(BASE_API_URL, API_PRODUCT_PREFIX);
    }

    public count = (productFilter?: ProductFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.count)), productFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public list = (productFilter?: ProductFilter): Observable<Product[]> => {
        return this.httpObservable.post<Product[]>(kebabCase(nameof(this.list)), productFilter)
            .pipe(map((response: AxiosResponse<Product[]>) => response.data));
    };

    public get = (id: number | string): Observable<Product> => {
        return this.httpObservable.post<Product>
            (kebabCase(nameof(this.get)), { id })
            .pipe(map((response: AxiosResponse<Product>) => response.data));
    };

    public create = (product: Product): Observable<Product> => {
        return this.httpObservable.post<Product>(kebabCase(nameof(this.create)), product)
            .pipe(map((response: AxiosResponse<Product>) => response.data));
    };

    public update = (product: Product): Observable<Product> => {
        return this.httpObservable.post<Product>(kebabCase(nameof(this.update)), product)
            .pipe(map((response: AxiosResponse<Product>) => response.data));
    };

    public delete = (product: Product): Observable<Product> => {
        return this.httpObservable.post<Product>(kebabCase(nameof(this.delete)), product)
            .pipe(map((response: AxiosResponse<Product>) => response.data));
    };

    public save = (product: Product): Observable<Product> => {
        return product.id ? this.update(product) : this.create(product);
    };

    public singleListBrand = (brandFilter: BrandFilter): Observable<Brand[]> => {
        return this.httpObservable.post<Brand[]>(kebabCase(nameof(this.singleListBrand)), brandFilter)
            .pipe(map((response: AxiosResponse<Brand[]>) => response.data));
    };
    public singleListCategory = (categoryFilter: CategoryFilter): Observable<Category[]> => {
        return this.httpObservable.post<Category[]>(kebabCase(nameof(this.singleListCategory)), categoryFilter)
            .pipe(map((response: AxiosResponse<Category[]>) => response.data));
    };
    public singleListProductType = (productTypeFilter: ProductTypeFilter): Observable<ProductType[]> => {
        return this.httpObservable.post<ProductType[]>(kebabCase(nameof(this.singleListProductType)), productTypeFilter)
            .pipe(map((response: AxiosResponse<ProductType[]>) => response.data));
    };
    public singleListStatus = (): Observable<Status[]> => {
        return this.httpObservable.post<Status[]>(kebabCase(nameof(this.singleListStatus)), new StatusFilter())
            .pipe(map((response: AxiosResponse<Status[]>) => response.data));
    };
    public singleListUsedVariation = (): Observable<UsedVariation[]> => {
        return this.httpObservable.post<UsedVariation[]>(kebabCase(nameof(this.singleListUsedVariation)),new  UsedVariationFilter())
            .pipe(map((response: AxiosResponse<UsedVariation[]>) => response.data));
    };
    public singleListSupplier = (supplierFilter: SupplierFilter): Observable<Supplier[]> => {
        return this.httpObservable.post<Supplier[]>(kebabCase(nameof(this.singleListSupplier)), supplierFilter)
            .pipe(map((response: AxiosResponse<Supplier[]>) => response.data));
    };
    public singleListTaxType = (taxTypeFilter: TaxTypeFilter): Observable<TaxType[]> => {
        return this.httpObservable.post<TaxType[]>(kebabCase(nameof(this.singleListTaxType)), taxTypeFilter)
            .pipe(map((response: AxiosResponse<TaxType[]>) => response.data));
    };
    public singleListUnitOfMeasure = (unitOfMeasureFilter: UnitOfMeasureFilter): Observable<UnitOfMeasure[]> => {
        return this.httpObservable.post<UnitOfMeasure[]>(kebabCase(nameof(this.singleListUnitOfMeasure)), unitOfMeasureFilter)
            .pipe(map((response: AxiosResponse<UnitOfMeasure[]>) => response.data));
    };
    public singleListUnitOfMeasureGrouping = (unitOfMeasureGroupingFilter: UnitOfMeasureGroupingFilter): Observable<UnitOfMeasureGrouping[]> => {
        return this.httpObservable.post<UnitOfMeasureGrouping[]>(kebabCase(nameof(this.singleListUnitOfMeasureGrouping)), unitOfMeasureGroupingFilter)
            .pipe(map((response: AxiosResponse<UnitOfMeasureGrouping[]>) => response.data));
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
    public countItemHistory = (itemHistoryFilter?: ItemHistoryFilter): Observable<number> => {
        return this.httpObservable.post<number>(kebabCase(nameof(this.countItemHistory)), itemHistoryFilter)
          .pipe(map((response: AxiosResponse<number>) => response.data));
    };

    public listItemHistory = (itemHistoryFilter?: ItemHistoryFilter): Observable<ItemHistory[]> => {
        return this.httpObservable.post<ItemHistory[]>(kebabCase(nameof(this.listItemHistory)), itemHistoryFilter)
            .pipe(map((response: AxiosResponse<ItemHistory[]>) => response.data));
    };
}

export const productRepository = new ProductRepository();
