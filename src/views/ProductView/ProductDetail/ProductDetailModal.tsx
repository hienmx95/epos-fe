/* begin general import */
import React, { useContext, Dispatch } from "react";
import nameof from "ts-nameof.macro";
import { Card, Col, Row, Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { AppAction, AppState } from "app/app-store";
import { AppStoreContext } from "app/app-context";
import Modal, { ModalProps } from "components/Utility/Modal/Modal";
import FormItem from "components/Utility/FormItem/FormItem";
import { FormDetailAction, formService } from "services/form-service";
import { ASSETS_SVG } from "config/consts";
/* end general import */

/* begin individual import */
import { Switch } from "antd";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import InputNumber, {
  DECIMAL,
  LONG,
} from "components/Utility/Input/InputNumber/InputNumber";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import { Product } from "models/Product";
import { productRepository } from "repositories/product-repository";
import { BrandFilter } from "models/Brand";
import { CategoryFilter } from "models/Category";
import { ProductTypeFilter } from "models/ProductType";
import { StatusFilter } from "models/Status";
import { SupplierFilter } from "models/Supplier";
import { TaxTypeFilter } from "models/TaxType";
import { UnitOfMeasureFilter } from "models/UnitOfMeasure";
import { UnitOfMeasureGroupingFilter } from "models/UnitOfMeasureGrouping";
import { UsedVariationFilter } from "models/UsedVariation";
/* end individual import */

const { TabPane } = Tabs;

interface ProductDetailModalProps extends ModalProps {
  model: Product;
  onChangeSimpleField: (fieldName: string) => (fieldValue: any) => void;
  onChangeObjectField?: (
    fieldName: string
  ) => (fieldIdValue: number, fieldValue?: any) => void;
  onChangeTreeObjectField?: (
    fieldName: string,
    callback?: (id: number) => void
  ) => (list: any[]) => void;
  dispatchModel?: React.Dispatch<FormDetailAction<Product>>;
  loading?: boolean;
}

function ProductDetailModal(props: ProductDetailModalProps) {
  const [state] = useContext<[AppState, Dispatch<AppAction>]>(AppStoreContext);

  const {
    model,
    onChangeSimpleField,
    onChangeObjectField,
    onChangeTreeObjectField,
    loading,
  } = props;

  const [translate] = useTranslation();

  return (
    <Modal {...props} width={1200}>
      {loading ? (
        <div className="loading-block">
          <img src={ASSETS_SVG + "/spinner.svg"} alt="Loading..." />
        </div>
      ) : (
        <div className="page page__detail">
          <div className="page__modal-header w-100">
            <Row className="d-flex">
              <Col lg={24}>
                {model?.id ? (
                  <div className="page__title mr-1">
                    {translate("products.detail.title")}
                  </div>
                ) : (
                  translate("general.actions.create")
                )}
              </Col>
            </Row>
          </div>
          <div className="w-100 page__detail-tabs">
            <Row className="d-flex">
              <Col lg={24}>
                <Card>
                  <Tabs defaultActiveKey="1">
                    <TabPane
                      tab={translate("general.detail.generalInfomation")}
                      key="1"
                    >
                      <Row>
                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.code")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.code))}
                            message={model.errors?.code}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.code}
                              placeHolder={translate(
                                "products.placeholder.code"
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(nameof(model.code))}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.supplierCode")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.supplierCode))}
                            message={model.errors?.supplierCode}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.supplierCode}
                              placeHolder={translate(
                                "products.placeholder.supplierCode"
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(
                                nameof(model.supplierCode)
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.name")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.name))}
                            message={model.errors?.name}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.name}
                              placeHolder={translate(
                                "products.placeholder.name"
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(nameof(model.name))}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.description")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.description))}
                            message={model.errors?.description}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.description}
                              placeHolder={translate(
                                "products.placeholder.description"
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(
                                nameof(model.description)
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.scanCode")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.scanCode))}
                            message={model.errors?.scanCode}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.scanCode}
                              placeHolder={translate(
                                "products.placeholder.scanCode"
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(
                                nameof(model.scanCode)
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.eRPCode")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.eRPCode))}
                            message={model.errors?.eRPCode}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.eRPCode}
                              placeHolder={translate(
                                "products.placeholder.eRPCode"
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(
                                nameof(model.eRPCode)
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.salePrice")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.salePrice))}
                            message={model.errors?.salePrice}
                          >
                            <InputNumber
                              isMaterial={true}
                              value={model.salePrice}
                              placeHolder={translate(
                                "products.placeholder.salePrice"
                              )}
                              onChange={onChangeSimpleField(
                                nameof(model.salePrice)
                              )}
                              numberType={DECIMAL}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.retailPrice")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.retailPrice))}
                            message={model.errors?.retailPrice}
                          >
                            <InputNumber
                              isMaterial={true}
                              value={model.retailPrice}
                              placeHolder={translate(
                                "products.placeholder.retailPrice"
                              )}
                              onChange={onChangeSimpleField(
                                nameof(model.retailPrice)
                              )}
                              numberType={DECIMAL}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.otherName")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.otherName))}
                            message={model.errors?.otherName}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.otherName}
                              placeHolder={translate(
                                "products.placeholder.otherName"
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(
                                nameof(model.otherName)
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.technicalName")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.technicalName))}
                            message={model.errors?.technicalName}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.technicalName}
                              placeHolder={translate(
                                "products.placeholder.technicalName"
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(
                                nameof(model.technicalName)
                              )}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.note")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.note))}
                            message={model.errors?.note}
                          >
                            <InputText
                              isMaterial={true}
                              value={model.note}
                              placeHolder={translate(
                                "products.placeholder.note"
                              )}
                              className={"tio-account_square_outlined"}
                              onChange={onChangeSimpleField(nameof(model.note))}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.isNew")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.isNew))}
                            message={model.errors?.isNew}
                          >
                            <Switch
                              size="small"
                              onChange={onChangeSimpleField(
                                nameof(model.isNew)
                              )}
                              checked={model.isNew}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.brand")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.brand))}
                            message={model.errors?.brand}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={BrandFilter}
                              placeHolder={translate(
                                "products.placeholder.brand"
                              )}
                              getList={productRepository.singleListBrand}
                              onChange={onChangeObjectField(
                                nameof(model.brand)
                              )}
                              model={model.brand}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.category")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.category))}
                            message={model.errors?.category}
                          >
                            <TreeSelect
                              isMaterial={true}
                              placeHolder={translate(
                                "products.placeholder.category"
                              )}
                              selectable={true}
                              classFilter={CategoryFilter}
                              onChange={onChangeTreeObjectField(
                                nameof(model.category)
                              )}
                              checkStrictly={true}
                              getTreeData={productRepository.singleListCategory}
                              item={model.category}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.productType")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.productType))}
                            message={model.errors?.productType}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={ProductTypeFilter}
                              placeHolder={translate(
                                "products.placeholder.productType"
                              )}
                              getList={productRepository.singleListProductType}
                              onChange={onChangeObjectField(
                                nameof(model.productType)
                              )}
                              model={model.productType}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.status")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.status))}
                            message={model.errors?.status}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={StatusFilter}
                              placeHolder={translate(
                                "products.placeholder.status"
                              )}
                              getList={productRepository.singleListStatus}
                              onChange={onChangeObjectField(
                                nameof(model.status)
                              )}
                              model={model.status}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.supplier")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.supplier))}
                            message={model.errors?.supplier}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={SupplierFilter}
                              placeHolder={translate(
                                "products.placeholder.supplier"
                              )}
                              getList={productRepository.singleListSupplier}
                              onChange={onChangeObjectField(
                                nameof(model.supplier)
                              )}
                              model={model.supplier}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.taxType")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.taxType))}
                            message={model.errors?.taxType}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={TaxTypeFilter}
                              placeHolder={translate(
                                "products.placeholder.taxType"
                              )}
                              getList={productRepository.singleListTaxType}
                              onChange={onChangeObjectField(
                                nameof(model.taxType)
                              )}
                              model={model.taxType}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.unitOfMeasure")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.unitOfMeasure))}
                            message={model.errors?.unitOfMeasure}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={UnitOfMeasureFilter}
                              placeHolder={translate(
                                "products.placeholder.unitOfMeasure"
                              )}
                              getList={
                                productRepository.singleListUnitOfMeasure
                              }
                              onChange={onChangeObjectField(
                                nameof(model.unitOfMeasure)
                              )}
                              model={model.unitOfMeasure}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.unitOfMeasureGrouping")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(
                              model.errors,
                              nameof(model.unitOfMeasureGrouping)
                            )}
                            message={model.errors?.unitOfMeasureGrouping}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={UnitOfMeasureGroupingFilter}
                              placeHolder={translate(
                                "products.placeholder.unitOfMeasureGrouping"
                              )}
                              getList={
                                productRepository.singleListUnitOfMeasureGrouping
                              }
                              onChange={onChangeObjectField(
                                nameof(model.unitOfMeasureGrouping)
                              )}
                              model={model.unitOfMeasureGrouping}
                            />
                          </FormItem>
                        </Col>

                        <Col lg={12} className="pr-3">
                          <FormItem
                            label={translate("products.usedVariation")}
                            validateStatus={formService.getValidationStatus<
                              Product
                            >(model.errors, nameof(model.usedVariation))}
                            message={model.errors?.usedVariation}
                          >
                            <Select
                              isMaterial={true}
                              classFilter={UsedVariationFilter}
                              placeHolder={translate(
                                "products.placeholder.usedVariation"
                              )}
                              getList={
                                productRepository.singleListUsedVariation
                              }
                              onChange={onChangeObjectField(
                                nameof(model.usedVariation)
                              )}
                              model={model.usedVariation}
                            />
                          </FormItem>
                        </Col>
                      </Row>
                    </TabPane>
                  </Tabs>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </Modal>
  );
}

export default ProductDetailModal;
