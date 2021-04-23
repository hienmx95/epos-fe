import { TFunction } from "i18next";
import React, { useState } from "react";
import { Product } from 'models/Product';
import classNames from "classnames";
import appMessageService from "services/app-message-service";
import { commonService } from "@react3l/react3l/services/common-service";
import { productRepository } from "repositories/product-repository";
import { AxiosError } from "axios";

export function useProductFooter(
    translate: TFunction,
    model?: Product,
    handleUpdateNewModel?: (item: Product) => void,
    handleGoBase?: () => void,
    handleCombine?: (retailPrice: number) => void,

) {

    const [subscription] = commonService.useSubscription();

    // const [loading, setLoading] = React.useState<boolean>(false);

    const {
        notifyUpdateItemSuccess,
        notifyUpdateItemError,
    } = appMessageService.useCRUDMessage();

    const handleSave = React.useCallback(() => {
        const modelValue = { ...model };
        subscription.add(
            productRepository
                .save(modelValue)
                // .pipe(finalize(() => setLoading(false)))
                .subscribe(
                    (item: Product) => {
                        handleUpdateNewModel(item); // setModel
                        handleGoBase(); // go master
                        notifyUpdateItemSuccess(); // global message service go here
                    },
                    (error: AxiosError<Product>) => {
                        if (error.response && error.response.status === 400) {
                            handleUpdateNewModel(error.response?.data); // setModel for catching error
                        }
                        notifyUpdateItemError(); // global message service go here
                    }
                )
        );
    }, [handleUpdateNewModel, handleGoBase, notifyUpdateItemSuccess, notifyUpdateItemError, model, subscription]);
    const [isNextPage, setNextPage] = useState<boolean>(false);
    const handleNextPage = React.useCallback(() => {
        setNextPage(true);
        handleCombine(model.retailPrice);
    }, [handleCombine, model.retailPrice]);

    const childrenAction = React.useMemo(() => {
        return (
            <>{model?.usedVariationId === 0 || model?.usedVariationId === undefined ?
                <button
                    className='btn btn-sm component__btn-primary mr-2'
                    onClick={handleSave}
                >
                    <span>
                        <i className='tio-save mr-2' /> {translate("general.actions.save")}
                    </span>
                </button>
                : (

                    <button
                        className={classNames('btn btn-sm component__btn-primary mr-2',
                            { 'hidden': model.items.length > 0 }
                        )}
                        onClick={handleNextPage}
                    >
                        <span>
                            <i className='tio-chevron_right mr-2' /> {translate("general.actions.next")}
                        </span>
                    </button>

                )
            }
                {model.items.length > 0 &&
                    <button
                        className='btn btn-sm component__btn-primary mr-2'
                        onClick={handleSave}
                    >
                        <span>
                            <i className='tio-save mr-2' /> {translate("general.actions.save")}
                        </span>
                    </button>
                }
                <button className="btn btn-sm component__btn-cancel" onClick={handleGoBase}>
                    <span>
                        <i className="tio-clear_circle_outlined mr-2"></i>{" "}
                        {translate("general.button.cancel")}
                    </span>
                </button>
            </>
        );
    }, [handleGoBase, handleNextPage, handleSave, model, translate]);



    return {
        childrenAction,
        isNextPage,
    };
}
