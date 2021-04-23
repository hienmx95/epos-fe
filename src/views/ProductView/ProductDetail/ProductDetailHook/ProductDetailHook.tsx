import { ItemHistoryFilter } from 'models/ItemHistory/ItemHistoryFilter';
import { Product } from 'models/Product';
import { ProductProductGroupingMapping } from 'models/ProductProductGroupingMapping';
import { Status } from "models/Status";
import { UnitOfMeasureGroupingFilter } from "models/UnitOfMeasureGrouping";
import { UnitOfMeasureGroupingContent } from "models/UnitOfMeasureGroupingContent";
import { UsedVariation } from "models/UsedVariation";
import React, { useState } from 'react';
import { productRepository } from "repositories/product-repository";
import { enumService } from 'services/enum-service';
export function useProductDetailHook(
    model: Product,
    setModel: (data: Product) => void,
) {
    const [unitOfMeasureGroupingFilter, setUnitOfMeasureGroupingFilter] =
        useState<UnitOfMeasureGroupingFilter>(new UnitOfMeasureGroupingFilter());
    const [itemHistoryFilter, setItemHistoryFilter] = React.useState<ItemHistoryFilter>(new ItemHistoryFilter());
    const [usedVariationList] = enumService.useEnumList<UsedVariation>(
        productRepository.singleListUsedVariation,
    );
    const [statusList] = enumService.useEnumList<Status>(
        productRepository.singleListStatus,
    );

    const handleChangeUOM = React.useCallback(
        (id, value) => {
            model.unitOfMeasure = value;
            model.unitOfMeasureId = id;
            if (
                unitOfMeasureGroupingFilter.unitOfMeasureId.equal !== id
            ) {
                model.unitOfMeasureGroupingId = undefined;
                model.unitOfMeasureGrouping = undefined;
                if (model.errors?.unitOfMeasure) model.errors.unitOfMeasure = null;
            }
            setModel({ ...model });
            setUnitOfMeasureGroupingFilter({
                ...unitOfMeasureGroupingFilter,
                unitOfMeasureId: {
                    equal: id,
                }
            });
        }, [setModel, model, unitOfMeasureGroupingFilter]);

    const handleChangeUsedVariation = React.useCallback(
        (value) => {
            const modelValue = { ...model };

            const statusId = value.target.checked ? 1 : 0;
            const status = usedVariationList.filter(item => item.id === statusId)[0];

            modelValue.usedVariation = status;

            modelValue.usedVariationId = status?.id;

            setModel(modelValue);

        }, [setModel, usedVariationList, model]);

    const renderItems = React.useMemo(() => {
        const contentList = [];
        if (model) {
            if (model.unitOfMeasureGrouping) {
                if (
                    model.unitOfMeasureGrouping.unitOfMeasureGroupingContents &&
                    model.unitOfMeasureGrouping.unitOfMeasureGroupingContents.length > 0
                )
                    model.unitOfMeasureGrouping.unitOfMeasureGroupingContents.forEach(
                        (content: UnitOfMeasureGroupingContent) => {
                            if (content.unitOfMeasure && content.factor) {
                                const { unitOfMeasure, factor } = content;
                                const value = `${unitOfMeasure.name} (${factor})`;
                                contentList.push(value);
                            }
                        },
                    );
            }
        }
        return contentList.join(',');
    }, [model]);
    const listItemHistory = React.useMemo(() => {
        let histories = [];
        if (model) {
            itemHistoryFilter.productId = model.id;
            setItemHistoryFilter(itemHistoryFilter);
            productRepository.listItemHistory(itemHistoryFilter)
                .subscribe(list => histories = [...list]);
            return histories;

        }
    }, [itemHistoryFilter, model]);
    const handleChangeChangeProductGrouping = React.useCallback((value) => {
        const list = value.map(item => {

            const mapping = new ProductProductGroupingMapping();
            mapping.productGrouping = item;
            mapping.productGroupingId = item?.id;
            return mapping;
        });
        setModel({
            ...model,
            productProductGroupingMappings: list,
        });

    }, [model, setModel]);
    return {
        handleChangeUOM,
        handleChangeUsedVariation,
        unitOfMeasureGroupingFilter,
        setUnitOfMeasureGroupingFilter,
        statusList,
        renderItems,
        listItemHistory,
        handleChangeChangeProductGrouping,
    };

}