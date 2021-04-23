import React, { Dispatch, SetStateAction } from "react";
import InputText from "components/Utility/Input/InputText/InputText";
import { useTranslation } from "react-i18next";
import { Variation } from "models/Variation";
import nameof from "ts-nameof.macro";
import FormItem from "components/Utility/FormItem/FormItem";
import { Modal, ModalProps } from "antd";

export interface VariationModalProps extends ModalProps {
    model?: Variation;
    setModel?: Dispatch<SetStateAction<Variation>>;
    visible?: boolean;
    onClose?: () => void;
    onSave?: (value?: any) => void;
}
export default function VariationModal(props: VariationModalProps) {
    const { visible, onSave, onClose, model, setModel } = props;
    const [variation, setVariation] = React.useState<Variation>(new Variation());
    const [translate] = useTranslation();
    const handleChangeSimpleField = React.useCallback(
        (field: string) => {
            return (value) => {
                variation[field] = value;
                setVariation({ ...variation });
            };

        }, [variation]);
    const handleSave = React.useCallback(
        () => {
            model.variations.push(variation);
            setModel({
                ...model,
            });
            onSave(model);
            setVariation(new Variation());
        }, [model, onSave, setModel, variation]);
    return (
        <Modal
            title={translate("general.actions.create")}
            visible={visible}
            footer={null}
            closable={false}
        >
            <div className="page page__detail">
                <div className="w-100 ">

                    <FormItem
                        label={translate("products.variations.name")}

                    >
                        <InputText
                            isMaterial={true}
                            value={variation.name}
                            placeHolder={translate("products.variations.placeholder.name")}
                            className={"tio-pages_outlined mr-3"}
                            onChange={handleChangeSimpleField(nameof(variation.name))}
                        />
                    </FormItem>

                    <FormItem
                        label={translate("products.variations.code")}

                    >
                        <InputText
                            isMaterial={true}
                            value={variation.code}
                            placeHolder={translate("products.variations.placeholder.name")}
                            className={"tio-pages_outlined mr-3"}
                            onChange={handleChangeSimpleField(nameof(variation.code))}
                        />
                    </FormItem>
                </div>
                <div className='d-flex justify-content-end mt-3'>
                    <button
                        className='btn btn-sm component__btn-primary mr-2'
                        onClick={handleSave}
                    >
                        <span>
                            <i className='tio-save' /> {translate("general.actions.save")}
                        </span>
                    </button>
                    <button
                        className='btn btn-sm component__btn-cancel'
                        onClick={onClose}
                    >
                        <i className='tio-clear' /> {translate("general.actions.cancel")}
                    </button>
                </div>
            </div>
        </Modal>
    );

}
