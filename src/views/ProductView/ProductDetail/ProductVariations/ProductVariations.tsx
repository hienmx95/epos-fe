import { Col, Row } from 'antd/lib/grid';
import FormItem from "components/Utility/FormItem/FormItem";
import InputText from 'components/Utility/Input/InputText/InputText';
import { Product } from 'models/Product';
import { VariationGrouping } from 'models/VariationGrouping';
import React, { Dispatch, SetStateAction } from 'react';
import { useTranslation } from 'react-i18next';
import { formService } from 'services/form-service';
import nameof from 'ts-nameof.macro';
import './ProductVariations.scss';
import VariationModal from './VariationModal';
export interface PriceAndVariations {
    model: Product;
    handleChangeVariationGroupingName?: (index: number) => void;
    handleCreateVariation?: (index: number) => void;
    handleRemoveVariation?: (indexVariation: number, variationGroup: VariationGrouping) => void;
    visible?: boolean;
    handleCloseVariation?: () => void;
    handleSaveVariation?: (item) => void;
    currentVariationGrouping?: VariationGrouping;
    setCurrentVariationGrouping?: Dispatch<SetStateAction<VariationGrouping>>,
    handleAddVariationGrouping?: () => void;

}

function ProductVariations(props: PriceAndVariations) {
    const [translate] = useTranslation();

    const {
        model,
        handleChangeVariationGroupingName,
        handleCreateVariation,
        handleRemoveVariation,
        visible,
        handleCloseVariation,
        handleSaveVariation,
        currentVariationGrouping,
        setCurrentVariationGrouping,
        handleAddVariationGrouping,
    } = props;

    return (
        <div className="price-and-variations pl-3 ">
            {model.variationGroupings &&
                model.variationGroupings.length > 0 && (

                    model.variationGroupings.map(
                        (variationGrouping: VariationGrouping, index: number) => {
                            return (
                                <Row
                                    className="ant-row ant-form-item variation"
                                    key={index}
                                    justify="space-between"
                                >

                                    <Col lg={10} className="mt-3">
                                        <FormItem
                                            label={translate('products.variationGroupingName')}
                                        >
                                            <InputText
                                                isMaterial={true}
                                                value={variationGrouping?.name}
                                                placeHolder={translate("products.placeholder.variationGroupingName")}
                                                className={"tio-material"}
                                                onChange={() => handleChangeVariationGroupingName(index)}
                                            />
                                        </FormItem>
                                    </Col>

                                    <Col lg={10} className="mt-3" >
                                        <FormItem label={translate('products.variationValue')}
                                        >
                                            <div className='product-input-tag__wrapper mr-3'>
                                                <div
                                                    className="input-tag__container input-tag__container--material"
                                                >
                                                    <div className={variationGrouping?.variations.length > 0 ? "" : "mt-3"} >
                                                        {variationGrouping?.variations &&
                                                            variationGrouping?.variations.map((item, indexVariation) => (
                                                                <span
                                                                    className='input-tag__label'
                                                                    key={indexVariation}
                                                                >
                                                                    <span className='input-tag__text'>{item.name}</span>
                                                                    <i
                                                                        className='input-tag__icon tio-clear'
                                                                        onClick={() => handleRemoveVariation(indexVariation, variationGrouping)}
                                                                    ></i>
                                                                </span>
                                                            ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <span onClick={() => handleCreateVariation(index)} className="mt-1 text-primary">
                                                <i className="tio-add_circle_outlined mr-2" />
                                            </span>

                                        </FormItem>

                                    </Col>
                                    <VariationModal
                                        visible={visible}
                                        onClose={handleCloseVariation}
                                        onSave={handleSaveVariation}
                                        model={currentVariationGrouping}
                                        setModel={setCurrentVariationGrouping}
                                    />
                                </Row>
                            );
                        },
                    )
                )}
            <div className="d-flex justify-content-start btn-add  text-primary"
                onClick={handleAddVariationGrouping}>
                <i className="tio-add_circle_outlined mr-2 mt-1" />
                {translate('products.createVariations')}
            </div>

            <Row>
                <Col className="mt-4">
                    <FormItem
                        validateStatus={formService.getValidationStatus<Product>(
                            model?.errors,
                            nameof(model.items),
                        )}
                        message={model.errors?.items}
                    > </FormItem>

                </Col>
            </Row>

        </div >
    );
}

export default ProductVariations;
