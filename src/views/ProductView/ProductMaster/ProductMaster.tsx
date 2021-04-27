/* begin general import */
import { IdFilter, StringFilter } from "@react3l/advanced-filters";
import { Card, Col, Dropdown, Menu, Row, Tooltip } from "antd";
import { ColumnProps } from "antd/lib/table";
import { AppMainMasterFilter } from "components/AppMain/MasterPage/AppMainMasterFilter";
import { AppMainMasterTable } from "components/AppMain/MasterPage/AppMainMasterTable";
// import { AppMainMasterTitle } from "components/AppMain/MasterPage/AppMainMasterTitle";
import AdvanceIdFilter from "components/Utility/AdvanceFilter/AdvanceIdFilter/AdvanceIdFilter";
/* end general import */
/* begin filter import */
import AdvanceStringFilter from "components/Utility/AdvanceFilter/AdvanceStringFilter/AdvanceStringFilter";
import AdvanceTreeFilter from "components/Utility/AdvanceFilter/AdvanceTreeFilter/AdvanceTreeFilter";
import { PRODUCT_ROUTE } from "config/route-consts";
import { Category, CategoryFilter } from "models/Category";
import { Product, ProductFilter } from "models/Product";
import { ProductProductGroupingMapping } from "models/ProductProductGroupingMapping";
import { ProductType, ProductTypeFilter } from "models/ProductType";
import { Status, StatusFilter } from "models/Status";
import { UsedVariationFilter } from "models/UsedVariation";
import React, { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";
/* end filter import */
/* begin individual import */
import { productRepository } from "repositories/product-repository";
import masterService, { UseMaster } from "services/pages/master-service";
import { getAntOrderType } from "services/table-service";
import nameof from "ts-nameof.macro";
import ProductPreview from "./ProductPreview";
import "./ProductMaster.scss";
import classNames from "classnames";
import Breadcrumb from "../../../layout/breadcrumb";
import ReactTable from "react-data-table-component";

/* end individual import */

function ProductMaster() {
  const [translate] = useTranslation();

  const master: UseMaster = masterService.useMaster<Product, ProductFilter>(
    ProductFilter,
    PRODUCT_ROUTE,
    productRepository.list,
    productRepository.count,
    productRepository.delete,
    productRepository.bulkDelete
  );
  const {
    isOpenPreview,
    isLoadingPreview,
    previewModel,
    handleOpenPreview,
    handleClosePreview,
  } = masterService.usePreview<Product>(Product, productRepository.get);
  // const product =[
  //   {'bóng đèn' ,'Vật liệu' ,''};
  // ]
  const Data = [
    {
      id: "1",
      name: "Product Menu",
      status: <i className="fa fa-circle font-success f-12" />,
      creat_on: "2018-04-18T00:00:00",
    },
    {
      id: "2",
      name: "Category Menu",
      status: <i className="fa fa-circle font-warning f-12" />,
      creat_on: "2018-04-18T00:00:00",
    },
  ];
  const Columns = [
    { name: "ID", selector: "id", sortable: true, center: true },
    { name: "Name", selector: "name", sortable: true, center: true },
    { name: "Status", selector: "status", sortable: true, center: true },
    { name: "Creat_on", selector: "creat_on", sortable: true, center: true },
  ];
  // const product = [
  //   {
  //     id:'1',
  //     name: 'bóng đèn',
  //     category:{name:'vật tư'},
  //     productProductGroupingMapping:{name:'vật tư'},
  //     productType:{name:'loại bóng'}
  //   },
  //   {
  //     id: 1,
  //     name: "Chưa thanh toán",
  //   },
  // ];
  const menu = React.useCallback(
    (id: number, product: Product) => (
      <Menu>
        <Menu.Item key="1">
          <Tooltip title={translate("general.actions.view")}>
            <div className="ant-action-menu" onClick={handleOpenPreview(id)}>
              {translate("general.actions.view")}
            </div>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="2">
          <Tooltip title={translate("general.actions.edit")}>
            <div
              className="ant-action-menu"
              onClick={master.handleGoDetail(id)}
            >
              {translate("general.actions.edit")}
            </div>
          </Tooltip>
        </Menu.Item>
        {!product.used && (
          <Menu.Item key="3">
            <Tooltip title={translate("general.actions.delete")}>
              <div
                className="ant-action-menu"
                onClick={() => master.handleServerDelete(product)}
              >
                {translate("general.actions.delete")}
              </div>
            </Tooltip>
          </Menu.Item>
        )}
      </Menu>
    ),
    [handleOpenPreview, master, translate]
  );

  const columns: ColumnProps<Product>[] = useMemo(
    () => [
      {
        title: (
          <div className="text-left gradient-text">
            {translate("products.name")}
          </div>
        ),
        key: nameof(master.list[0].productImageMappings),
        dataIndex: nameof(master.list[0].productImageMappings),
        width: 300,
        render(...[, product]) {
          return (
            <div className="product-cell-master__wapper">
              <div className="product-image">
                {product?.productImageMappings &&
                  product?.productImageMappings.length > 0 &&
                  product.productImageMappings.map(
                    (productImageMapping, index) => {
                      return (
                        <img
                          key={index}
                          src={productImageMapping?.image?.url}
                          width="48"
                          height="48"
                          alt=""
                        />
                      );
                    }
                  )}
              </div>
              <div className="ant-cell-master__container">
                <div
                  className={classNames("cell-master__first-row", {
                    "first-row--ellipsis":
                      product?.name && product?.name.length >= 10,
                  })}
                >
                  {product?.name}
                </div>
                <div className="cell-master__second-row">{product?.code}</div>
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("products.category")}
          </div>
        ),
        key: nameof(master.list[0].category),
        dataIndex: nameof(master.list[0].category),
        width: 200,
        sorter: true,
        sortOrder: getAntOrderType<Product, ProductFilter>(
          master.filter,
          nameof(master.list[0].category)
        ),
        render(category: Category) {
          return (
            <div className="ant-cell-master__container">
              <div
                className={classNames("cell-master__first-row", {
                  "first-row--ellipsis":
                    category?.name && category?.name.length >= 30,
                })}
              >
                {category?.name}
              </div>
              <div className="cell-master__second-row">
                {translate("products.category")}
              </div>
            </div>
          ); //fill the render field after generate code;
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("products.productGrouping")}
          </div>
        ),
        key: nameof(master.list[0].productProductGroupingMappings),
        dataIndex: nameof(master.list[0].productProductGroupingMappings),
        width: 200,
        render(productProductGroupingMappings: ProductProductGroupingMapping) {
          return (
            <>
              <div>
                {productProductGroupingMappings &&
                productProductGroupingMappings?.length > 0
                  ? productProductGroupingMappings.map(
                      (productGrouping, index) => {
                        return (
                          <span key={index}>
                            {productGrouping?.productGrouping &&
                              productGrouping?.productGrouping?.name}
                            {index <
                              productProductGroupingMappings.length - 1 && (
                              <span>, </span>
                            )}
                          </span>
                        );
                      }
                    )
                  : " "}
              </div>
              {productProductGroupingMappings.length > 0 && (
                <div className="table__title">
                  {translate("products.productGrouping")}
                </div>
              )}
            </>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("products.productType")}
          </div>
        ),
        key: nameof(master.list[0].productType),
        dataIndex: nameof(master.list[0].productType),
        width: 200,
        sorter: true,
        sortOrder: getAntOrderType<Product, ProductFilter>(
          master.filter,
          nameof(master.list[0].productType)
        ),
        render(productType: ProductType) {
          return (
            <div className="ant-cell-master__container">
              <div className={classNames("cell-master__first-row")}>
                {productType?.name}
              </div>
              <div className="cell-master__second-row">
                {translate("products.productType")}
              </div>
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("products.usedVariation")}
          </div>
        ),
        key: nameof(master.list[0].usedVariation),
        dataIndex: nameof(master.list[0].usedVariation),
        width: 200,
        sorter: true,
        sortOrder: getAntOrderType<Product, ProductFilter>(
          master.filter,
          nameof(master.list[0].usedVariation)
        ),
        render(usedVariation, product: Product) {
          return (
            <>
              {product.usedVariationId === 0 ? (
                <span className="cell-master__first-row">
                  {usedVariation?.name}
                </span>
              ) : (
                <span className="cell-master__first-row">
                  {usedVariation?.name} ( {product?.variationCounter} ){" "}
                </span>
              )}
              <div className="cell-master__second-row">
                {translate("products.usedVariation")}
              </div>
            </>
          );
        },
      },
      {
        title: (
          <div className="text-center gradient-text">
            {translate("products.status")}
          </div>
        ),
        key: nameof(master.list[0].status),
        dataIndex: nameof(master.list[0].status),
        align: "center",
        sorter: true,
        width: 200,
        sortOrder: getAntOrderType<Product, ProductFilter>(
          master.filter,
          nameof(master.list[0].status)
        ),
        render(status: Status) {
          return (
            <div className={status.id === 1 ? "active" : "inactive"}>
              {status?.name}
            </div>
          );
        },
      },

      {
        title: (
          <div className="text-center gradient-text">
            {translate("general.actions.label")}
          </div>
        ),
        key: "action",
        dataIndex: nameof(master.list[0].id),
        width: 150,
        fixed:'right',
        align: "center",
        render(id: number, product: Product) {
          return (
            <div className="d-flex justify-content-center button-action-table">
              <Dropdown overlay={menu(id, product)} trigger={["click"]}>
                <span className="action__dots">...</span>
              </Dropdown>
            </div>
          );
        },
      },
    ],
    [master, translate, menu]
  );

  const filterChildren = React.useMemo(
    () => (
      <div className="search__container mt-4">
        <Row justify="space-between">
          <Col lg={4}>
            <label className="label">{translate("products.productType")}</label>
            <AdvanceIdFilter
              value={
                master.filter[nameof(master.list[0].productTypeId)]["equal"]
              }
              onChange={master.handleChangeFilter(
                nameof(master.list[0].productTypeId),
                "equal" as any,
                IdFilter
              )}
              classFilter={ProductTypeFilter}
              getList={productRepository.singleListProductType}
              placeHolder={translate("products.placeholder.productType")}
              isMaterial={true}
            />
          </Col>

          <Col lg={4}>
            <label className="label">{translate("products.status")}</label>
            <AdvanceIdFilter
              value={master.filter[nameof(master.list[0].statusId)]["equal"]}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].statusId),
                "equal" as any,
                IdFilter
              )}
              classFilter={StatusFilter}
              getList={productRepository.singleListStatus}
              placeHolder={translate("products.placeholder.status")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4}>
            <label className="label">
              {translate("products.usedVariation")}
            </label>
            <AdvanceIdFilter
              value={
                master.filter[nameof(master.list[0].usedVariationId)]["equal"]
              }
              onChange={master.handleChangeFilter(
                nameof(master.list[0].usedVariationId),
                "equal" as any,
                IdFilter
              )}
              classFilter={UsedVariationFilter}
              getList={productRepository.singleListUsedVariation}
              placeHolder={translate("products.placeholder.usedVariation")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4}>
            <label className="label">
              {translate("products.productGrouping")}
            </label>
            <AdvanceTreeFilter
              placeHolder={translate("products.placeholder.productGrouping")}
              classFilter={CategoryFilter}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].productGroupingId),
                "equal" as any,
                IdFilter
              )}
              checkStrictly={true}
              getTreeData={productRepository.singleListProductGrouping}
              isMaterial={true}
            />
          </Col>
          <Col lg={4}>
            <label className="label">{translate("products.category")}</label>
            <AdvanceTreeFilter
              placeHolder={translate("products.placeholder.category")}
              classFilter={CategoryFilter}
              onChange={master.handleChangeFilter(
                nameof(master.list[0].categoryId),
                "equal" as any,
                IdFilter
              )}
              checkStrictly={true}
              getTreeData={productRepository.singleListCategory}
              isMaterial={true}
            />
          </Col>
        </Row>
        <Row justify="space-between">
          <Col lg={4}>
            <label className="label">{translate("products.name")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].name)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].name),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("products.placeholder.name")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4}>
            <label className="label">{translate("products.otherName")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].otherName)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].otherName),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("products.placeholder.otherName")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4}>
            <label className="label">{translate("products.code")}</label>
            <AdvanceStringFilter
              value={master.filter[nameof(master.list[0].code)]["contain"]}
              onEnter={master.handleChangeFilter(
                nameof(master.list[0].code),
                "contain" as any,
                StringFilter
              )}
              placeHolder={translate("products.placeholder.code")}
              isMaterial={true}
            />
          </Col>
          <Col lg={4} />
          <Col lg={4} />
        </Row>
      </div>
    ),
    [master, translate]
  );

  return (
    <>
      <div>
        <Fragment>
          <Breadcrumb
            parent="Quản lý Voucher"
            title={translate("products.master.title")}
          />
        </Fragment>
      </div>
      <div className="page page__master">
        {/* <AppMainMasterTitle {...master}>
          {translate("products.master.title")}
        </AppMainMasterTitle> */}
        <Card>
          <AppMainMasterFilter
            {...master}
            repository={productRepository}
            translate={translate}
          >
            {filterChildren}
          </AppMainMasterFilter>
          <AppMainMasterTable
            {...master}
            translate={translate}
            columns={columns}
            isDragable={true}
          >
            {translate("products.table.title")}
          </AppMainMasterTable>
          <ReactTable columns={Columns} data={Data} noHeader pagination />
        </Card>
      </div>
      <ProductPreview
        previewModel={previewModel}
        isOpenPreview={isOpenPreview}
        isLoadingPreview={isLoadingPreview}
        handleClosePreview={handleClosePreview}
        handleGoDetail={master.handleGoDetail}
        translate={translate}
      />
    </>
  );
}

export default ProductMaster;
