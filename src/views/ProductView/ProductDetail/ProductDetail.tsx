import { CaretRightOutlined } from "@ant-design/icons";
import { Checkbox, Col, Collapse, Row, Table, Tooltip } from "antd";
import AppFooter from "components/AppFooter/AppFooter";
import { DECIMAL } from "components/Utility/AdvanceFilter/AdvanceNumberFilter/AdvanceNumberFilter";
import CategorySelect from "components/Utility/CategorySelect/CategorySelect";
import FormItem from "components/Utility/FormItem/FormItem";
import InputNumber from "components/Utility/Input/InputNumber/InputNumber";
import InputText from "components/Utility/Input/InputText/InputText";
import Select from "components/Utility/Select/Select";
import SwitchStatus from "components/Utility/SwitchStatus/SwitchStatus";
import TreeSelect from "components/Utility/TreeSelect/TreeSelect";
import UploadFile from "components/Utility/UploadFile/UploadFile";
import { PRODUCT_MASTER_ROUTE } from "config/route-consts";
import { BrandFilter } from "models/Brand";
import { CategoryFilter } from "models/Category/CategoryFilter";
import { Product } from "models/Product";
import { ProductGroupingFilter } from "models/ProductGrouping";
import { ProductProductGroupingMapping } from "models/ProductProductGroupingMapping";
import { ProductTypeFilter } from "models/ProductType";
import { TaxTypeFilter } from "models/TaxType";
import { UnitOfMeasureFilter } from "models/UnitOfMeasure";
import { UnitOfMeasureGroupingFilter } from "models/UnitOfMeasureGrouping/UnitOfMeasureGroupingFilter";
import React from "react";
import { useTranslation } from "react-i18next";
import { productGroupingRepository } from "repositories/product-grouping-repository";
import { productRepository } from "repositories/product-repository";
import { formService } from "services/form-service";
import detailService from "services/pages/detail-service";
import nameof from "ts-nameof.macro";
// import ProductCategory from './ProductCategory';
import "./ProductDetail.scss";
import { useProductDetailHook } from "./ProductDetailHook/ProductDetailHook";
import ProductVariations from "./ProductVariations/ProductVariations";
import { useProductFooter } from "./ProductDetailHook/ProductFooterHook";
import { useProductVariationHook } from "./ProductDetailHook/ProductVariationHook";
import { ColumnProps } from "antd/lib/table";
import { Item } from "models/Item";
import { ItemImageMapping } from "models/ItemImageMapping";
const { Panel } = Collapse;

function ProductDetail() {
  const [translate] = useTranslation();

  const {
    model,
    handleUpdateNewModel,
    handleChangeSimpleField,
    handleChangeObjectField,
    handleGoBase,
  } = detailService.useDetail<Product>(
    Product,
    productRepository.get,
    productRepository.save,
    PRODUCT_MASTER_ROUTE
  );
  const {
    handleChangeUOM,
    statusList,
    handleChangeUsedVariation,
    unitOfMeasureGroupingFilter,
    handleChangeChangeProductGrouping,
    renderItems,
  } = useProductDetailHook(model, handleUpdateNewModel);

  const {
    currentVariationGrouping,
    setCurrentVariationGrouping,
    handleAddVariationGrouping,
    visible,
    handleCreateVariation,
    handleCloseVariation,
    handleSaveVariation,
    handleChangeVariationGroupingName,
    handleRemoveVariation,
    handleCombine,
    handleChangeListSimpleField,
    handleChangeListObjectField,
    handleDeleteItem,
    loading,
  } = useProductVariationHook(model, handleUpdateNewModel);
  const { childrenAction, isNextPage } = useProductFooter(
    translate,
    model,
    handleUpdateNewModel,
    handleGoBase,
    handleCombine
  );

  const columns: ColumnProps<Item>[] = React.useMemo(() => {
    return [
      {
        title: translate("items.images"),
        key: nameof(model.items[0].images),
        dataIndex: nameof(model.items[0].images),
        render(...[, item, index]) {
          const images = [];
          if (item?.itemImageMappings && item?.itemImageMappings.length > 0) {
            item?.itemImageMappings.map(
              (itemImageMapping: ItemImageMapping) => {
                return images.push(itemImageMapping.image);
              }
            );
          }
          return <UploadFile />;
        },
      },

      {
        title: translate("items.name"),
        key: nameof(model.items[0].name),
        dataIndex: nameof(model.items[0].name),
        render(...[, item]) {
          return item?.name;
        },
      },
      {
        title: translate("items.code"),
        key: nameof(model.items[0].code),
        dataIndex: nameof(model.items[0].code),
        render(...[, item]) {
          return item?.code;
        },
      },
      {
        title: translate("items.scanCode"),
        key: nameof(model.items[0].scanCode),
        dataIndex: nameof(model.items[0].scanCode),
        render(...[, item, index]) {
          return (
            <FormItem
              validateStatus={formService.getValidationStatus<Product>(
                item.errors,
                nameof(item.scanCode)
              )}
              message={item.errors?.scanCode}
            >
              <InputText
                isMaterial={true}
                value={item.scanCode}
                // placeHolder={translate("products.placeholder.eRPCode")}
                className={"tio-account_square_outlined"}
                onChange={handleChangeListSimpleField(
                  nameof(item.scanCode),
                  index
                )}
              />
            </FormItem>
          );
        },
      },
      {
        title: translate("items.price"),
        key: nameof(model.items[0].salePrice),
        dataIndex: nameof(model.items[0].salePrice),
        render(...[, item, index]) {
          return (
            <FormItem
              validateStatus={formService.getValidationStatus<Item>(
                item.errors,
                nameof(item.salePrice)
              )}
              message={item.errors?.salePrice}
            >
              <InputNumber
                isMaterial={true}
                value={item.salePrice}
                onChange={handleChangeListSimpleField(
                  nameof(item.salePrice),
                  index
                )}
                numberType={DECIMAL}
              />
            </FormItem>
          );
        },
      },
      {
        title: translate("items.retailPrice"),
        key: nameof(model.items[0].retailPrice),
        dataIndex: nameof(model.items[0].retailPrice),
        render(...[, item, index]) {
          return (
            <FormItem
              validateStatus={formService.getValidationStatus<Item>(
                item.errors,
                nameof(item.retailPrice)
              )}
              message={item.errors?.retailPrice}
            >
              <InputNumber
                isMaterial={true}
                value={item.retailPrice}
                onChange={handleChangeListSimpleField(
                  nameof(item.retailPrice),
                  index
                )}
                numberType={DECIMAL}
              />
            </FormItem>
          );
        },
      },
      {
        title: translate("items.status"),
        key: nameof(model.items[0].key),
        dataIndex: nameof(model.items[0].status),
        align: "center",
        width: 150,
        render(...[, item, index]) {
          return (
            <>
              {statusList.length > 0 && (
                <SwitchStatus
                  checked={item.statusId === statusList[1]?.id ? true : false}
                  list={statusList}
                  onChange={handleChangeListObjectField(
                    nameof(item.status),
                    index
                  )}
                />
              )}
            </>
          );
        },
      },
      {
        title: translate("general.actions.label"),
        key: "action",
        // width: 100,
        align: "center",
        render(...params: [Item, Item, number]) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              {/* <Tooltip title={translate('general.actions.history')}>
                                <button
                                    className="btn btn-link btn-action"
                                // onClick={() => handleViewHistory(params[1])}
                                >
                                    <i className="tio-history" />
                                </button>
                            </Tooltip> */}
              {!params[1].used && (
                <Tooltip title={translate("general.actions.delete")}>
                  <button
                    className="btn btn-link btn-action"
                    onClick={handleDeleteItem(params[2])}
                  >
                    <i className="tio-delete_outlined" />
                  </button>
                </Tooltip>
              )}
            </div>
          );
        },
      },
    ];
  }, [
    handleChangeListObjectField,
    handleChangeListSimpleField,
    handleDeleteItem,
    model.items,

    statusList,
    translate,
  ]);

  return (
    <>
      {!isNextPage ? (
        <div className="page__detail-tabs">
          <>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col lg={14} className="gutter-row">
                <Collapse
                  defaultActiveKey={["1"]}
                  onChange={() => {}}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                  className="site-collapse-custom-collapse"
                  expandIconPosition="right"
                >
                  <Panel
                    header={"Thông tin chung"}
                    key="1"
                    className="site-collapse-custom-panel"
                  >
                    <Row>
                      <Col lg={24}>
                        <div className="upload-file__container">
                          <UploadFile />
                        </div>
                      </Col>
                    </Row>
                    <Row></Row>
                    <Row>
                      <Col lg={12}>
                        <FormItem>
                          <SwitchStatus
                            checked={
                              model.statusId === statusList[1]?.id
                                ? true
                                : false
                            }
                            list={statusList}
                            onChange={handleChangeObjectField(
                              nameof(model.status)
                            )}
                          />
                          <span className="product-label ml-2">
                            {translate("products.status")}
                          </span>
                        </FormItem>
                      </Col>
                      <Col lg={12}>
                        <div className="d-flex justify-content-end">
                          <Checkbox
                            onChange={handleChangeSimpleField(
                              nameof(model.isOrder)
                            )}
                            checked={model.isOrder}
                          >
                            <span className="product-label">
                              {translate("products.isOrder")}
                            </span>
                          </Checkbox>
                          <Checkbox
                            onChange={handleChangeSimpleField(
                              nameof(model.isSale)
                            )}
                            checked={model.isSale}
                          >
                            <span className="product-label">
                              {translate("products.isSale")}
                            </span>
                          </Checkbox>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={24} className="mt-3">
                        <FormItem
                          label={translate("products.name")}
                          validateStatus={formService.getValidationStatus<
                            Product
                          >(model.errors, nameof(model.name))}
                          message={model.errors?.name}
                          isRequired={true}
                        >
                          <InputText
                            isMaterial={true}
                            value={model.name}
                            placeHolder={translate("products.placeholder.name")}
                            className={"tio-shopping_icon"}
                            onChange={handleChangeSimpleField(
                              nameof(model.name)
                            )}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={24} className="mt-3">
                        <FormItem
                          label={translate("products.category")}
                          validateStatus={formService.getValidationStatus<
                            Product
                          >(model.errors, nameof(model.category))}
                          message={model.errors?.category}
                        >
                          <CategorySelect
                            isMaterial={true}
                            classFilter={CategoryFilter}
                            placeHolder={translate(
                              "products.placeholder.category"
                            )}
                            getList={productRepository.singleListCategory}
                            onChange={handleChangeObjectField(
                              nameof(model.category)
                            )}
                            model={model.category}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col span={10} className="mt-3">
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
                            placeHolder={translate("products.placeholder.code")}
                            className={"tio-format_bullets"}
                            onChange={handleChangeSimpleField(
                              nameof(model.code)
                            )}
                          />
                        </FormItem>
                      </Col>
                      <Col span={10} className="mt-3">
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
                            className={"tio-carousel_horizontal_outlined"}
                            onChange={handleChangeSimpleField(
                              nameof(model.otherName)
                            )}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row justify="space-between">
                      <Col lg={10} className="mt-3">
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
                            className={"tio-barcode"}
                            onChange={handleChangeSimpleField(
                              nameof(model.scanCode)
                            )}
                          />
                        </FormItem>
                      </Col>
                      <Col lg={10} className="mt-3">
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
                            className={"tio-carousel_horizontal_outlined"}
                            onChange={handleChangeSimpleField(
                              nameof(model.eRPCode)
                            )}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={24} className="mt-3">
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
                            className={"tio-comment_text_outlined"}
                            onChange={handleChangeSimpleField(
                              nameof(model.description)
                            )}
                          />
                        </FormItem>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={12} className="mt-3">
                        <Checkbox
                          onChange={handleChangeUsedVariation}
                          checked={model.usedVariationId === 1 ? true : false}
                        >
                          <span className="product-label">
                            {translate("products.usedVariation")}
                          </span>
                        </Checkbox>
                      </Col>
                    </Row>
                  </Panel>
                </Collapse>
              </Col>
              <Col lg={5} className="gutter-row">
                <Row>
                  <Col lg={24} className="product-form">
                    <Collapse
                      defaultActiveKey={["1"]}
                      onChange={() => {}}
                      className="site-collapse-custom-collapse "
                      expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                      )}
                      expandIconPosition="right"
                    >
                      <Panel
                        header={"Đơn vị"}
                        key="1"
                        className="site-collapse-custom-panel product-panel"
                      >
                        <Row>
                          <Col lg={24} className="mt-3">
                            <FormItem
                              label={translate("products.unitOfMeasure")}
                              validateStatus={formService.getValidationStatus<
                                Product
                              >(model.errors, nameof(model.unitOfMeasure))}
                              message={model.errors?.unitOfMeasure}
                              isRequired={true}
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
                                onChange={handleChangeUOM}
                                model={model.unitOfMeasure}
                              />
                            </FormItem>
                          </Col>
                          <Col lg={24} className="mt-3">
                            <FormItem
                              label={translate(
                                "products.unitOfMeasureGrouping"
                              )}
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
                                onChange={handleChangeObjectField(
                                  nameof(model.unitOfMeasureGrouping)
                                )}
                                model={model.unitOfMeasureGrouping}
                                modelFilter={unitOfMeasureGroupingFilter}
                              />
                            </FormItem>
                          </Col>
                          <Col lg={24} className="mt-3">
                            <FormItem
                              label={translate(
                                "products.unitOfMeasureGroupingContent"
                              )}
                            >
                              <InputText
                                isMaterial={true}
                                value={renderItems}
                                disabled={true}
                                placeHolder={translate(
                                  "products.placeholder.unitOfMeasureGroupingContent"
                                )}
                              />
                            </FormItem>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  </Col>
                  <Col lg={24}>
                    <Collapse
                      defaultActiveKey={["1"]}
                      onChange={() => {}}
                      className="site-collapse-custom-collapse"
                      expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                      )}
                      expandIconPosition="right"
                    >
                      <Panel
                        header={"Phân loại"}
                        key="1"
                        className="site-collapse-custom-panel"
                        style={{ height: "298px" }}
                      >
                        <Row>
                          <Col lg={24} className="mt-3">
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
                                onChange={handleChangeObjectField(
                                  nameof(model.brand)
                                )}
                                model={model.brand}
                              />
                            </FormItem>
                          </Col>
                          <Col lg={24} className="mt-3">
                            <FormItem
                              label={translate("products.productType")}
                              validateStatus={formService.getValidationStatus<
                                Product
                              >(model.errors, nameof(model.productType))}
                              message={model.errors?.productType}
                              isRequired={true}
                            >
                              <Select
                                isMaterial={true}
                                classFilter={ProductTypeFilter}
                                placeHolder={translate(
                                  "products.placeholder.productType"
                                )}
                                getList={
                                  productRepository.singleListProductType
                                }
                                onChange={handleChangeObjectField(
                                  nameof(model.productType)
                                )}
                                model={model.productType}
                              />
                            </FormItem>
                          </Col>
                          <Col lg={24} className="mt-3">
                            <FormItem
                              label={translate("products.productGrouping")}
                              validateStatus={formService.getValidationStatus<
                                Product
                              >(model.errors, nameof(model.productGrouping))}
                              message={model.errors?.productGrouping}
                            >
                              <TreeSelect
                                isMaterial={true}
                                checkable={true}
                                placeHolder={translate(
                                  "products.placeholder.productGrouping"
                                )}
                                selectable={false}
                                classFilter={ProductGroupingFilter}
                                onChange={handleChangeChangeProductGrouping}
                                checkStrictly={true}
                                getTreeData={
                                  productRepository.singleListProductGrouping
                                }
                                listItem={
                                  model.productProductGroupingMappings &&
                                  model.productProductGroupingMappings.map(
                                    (current: ProductProductGroupingMapping) =>
                                      current.productGrouping
                                  )
                                }
                              />
                            </FormItem>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  </Col>
                </Row>
              </Col>
              <Col lg={5} className="gutter-row">
                <Row>
                  <Col lg={24} className="product-form">
                    <Collapse
                      defaultActiveKey={["1"]}
                      onChange={() => {}}
                      className="site-collapse-custom-collapse"
                      expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                      )}
                      expandIconPosition="right"
                    >
                      <Panel
                        header={"Lịch sử"}
                        key="1"
                        className="site-collapse-custom-panel product-panel"
                      >
                        <Row>{/* {renderHistories} */}</Row>
                      </Panel>
                    </Collapse>
                  </Col>
                  <Col lg={24}>
                    <Collapse
                      defaultActiveKey={["1"]}
                      onChange={() => {}}
                      className="site-collapse-custom-collapse"
                      expandIcon={({ isActive }) => (
                        <CaretRightOutlined rotate={isActive ? 90 : 0} />
                      )}
                      expandIconPosition="right"
                    >
                      <Panel
                        header={"Giá sản phẩm"}
                        key="1"
                        className="site-collapse-custom-panel"
                        style={{ height: "298px" }}
                      >
                        <Row>
                          <Col lg={24} className="mt-3">
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
                                onChange={handleChangeSimpleField(
                                  nameof(model.salePrice)
                                )}
                                numberType={DECIMAL}
                                className="tio-money_vs"
                              />
                            </FormItem>
                          </Col>
                          <Col lg={24} className="mt-3">
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
                                onChange={handleChangeObjectField(
                                  nameof(model.taxType)
                                )}
                                model={model.taxType}
                              />
                            </FormItem>
                          </Col>
                        </Row>
                      </Panel>
                    </Collapse>
                  </Col>
                </Row>
              </Col>
            </Row>
            {model.usedVariationId === 1 && (
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col lg={14} className="gutter-row">
                  <Collapse
                    defaultActiveKey={["1"]}
                    onChange={() => {}}
                    expandIcon={({ isActive }) => (
                      <CaretRightOutlined rotate={isActive ? 90 : 0} />
                    )}
                    className="site-collapse-custom-collapse"
                    expandIconPosition="right"
                  >
                    <Panel
                      header={"Phiên bản"}
                      key="1"
                      className="site-collapse-custom-panel"
                    >
                      <ProductVariations
                        model={model}
                        handleChangeVariationGroupingName={
                          handleChangeVariationGroupingName
                        }
                        handleCreateVariation={handleCreateVariation}
                        handleRemoveVariation={handleRemoveVariation}
                        visible={visible}
                        handleCloseVariation={handleCloseVariation}
                        handleSaveVariation={handleSaveVariation}
                        currentVariationGrouping={currentVariationGrouping}
                        setCurrentVariationGrouping={
                          setCurrentVariationGrouping
                        }
                        handleAddVariationGrouping={handleAddVariationGrouping}
                      />
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
            )}
          </>
        </div>
      ) : (
        <Row>
          <Collapse
            defaultActiveKey={["1"]}
            onChange={() => {}}
            // eslint-disable-next-line react/jsx-no-undef
            expandIcon={({ isActive }) => (
              <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
            className="site-collapse-custom-collapse"
            expandIconPosition="right"
          >
            <Panel
              header={"Phiên bản sản phẩm"}
              key="1"
              className="site-collapse-custom-panel"
            >
              <Table
                tableLayout="fixed"
                columns={columns}
                dataSource={model.items}
                pagination={false}
                rowKey={nameof(model.items[0].key)}
                loading={loading}
                className="table-variation"
              />
            </Panel>
          </Collapse>
        </Row>
      )}
      <AppFooter childrenAction={childrenAction}></AppFooter>
    </>
  );
}

export default ProductDetail;
