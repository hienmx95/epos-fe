/* begin general import */
import { Model } from "@react3l/react3l/core/model";
import { Descriptions, Row } from "antd";
import Modal from "components/Utility/Modal/Modal";
import { formatNumber } from "helpers/number";
import { TFunction } from "i18next";
/* end general import */
/* begin individual import */
import { Product } from "models/Product";
import React from "react";
import './ProductMaster.scss';
/* end individual import */

interface ProductPreviewProps<T extends Model> {
  previewModel?: T;
  isOpenPreview?: boolean;
  isLoadingPreview?: boolean;
  handleClosePreview?: () => void;
  handleGoDetail?: (id: number) => () => void;
  translate?: TFunction;
}

function ProductPreview(props: ProductPreviewProps<Product>) {
  const {
    previewModel,
    isOpenPreview,
    isLoadingPreview,
    handleClosePreview,
    handleGoDetail,
    translate,
  } = props;


  return (
    <>
      <Modal
        title={null}
        visible={isOpenPreview}
        handleCancel={handleClosePreview}
        width={1200}
        visibleFooter={false}
      >
        {isLoadingPreview ? (
          <div className="loading-block">
            <img src="/assets/svg/spinner.svg" alt="Loading..." />
          </div>
        ) : (
          <div className="preview__containter">
            <div className="preview__left-side">

              <div className="preview__body product-preview">
                <div className="btn-cancel" onClick={handleClosePreview}><i className='tio-clear_circle' /></div>
                <div className="product-preview__content">
                  <Row className="product-preview__header">
                    <>
                      {previewModel?.productImageMappings &&
                        previewModel?.productImageMappings.length > 0 &&
                        previewModel.productImageMappings.map((productImageMapping, index) => {
                          return (
                            <img
                              key={index}
                              src={productImageMapping?.image?.url}
                              width="104"
                              height="104"
                              alt=""
                            />
                          );
                        })
                      }
                    </>


                    <div className="name mt-2">{previewModel.name}</div>
                    <div className="code mt-2">
                      <span className="mr-2">{previewModel.code}</span>
                      {previewModel.statusId && <i className="tio-checkmark_circle" style={{ color: '#6DD230' }} />}
                    </div>
                    <button
                      className=" btn-go-detail"
                      onClick={handleGoDetail(previewModel.id)}
                    >
                      <i className="tio-new_message"></i>
                    </button>
                  </Row>
                  <Row className='w-100'>
                    <Descriptions.Item>
                      {previewModel.items && previewModel.items.length > 0
                        && previewModel.items.map((item) => {
                          return (
                            <div className="list_item">
                              <div className="d-flex ">
                                <div className="item-image mr-3">
                                  {item.itemImageMappings.length > 0 &&
                                    <img
                                      src={item.itemImageMappings[0]?.image?.url}
                                      alt="no data"
                                      className="item-image"
                                    />}
                                </div>
                                <div className="ant-cell-master__container">
                                  <div className="cell-master__first-row">{item.name}</div>
                                  <div className="cell-master__second-row">
                                    {item.code}
                                  </div>
                                </div>
                              </div>
                              <div className="ant-cell-master__container">
                                <div className="cell-master__first-row">{item.scanCode}</div>
                                <div className="cell-master__second-row">
                                  {translate('items.scanCode')}</div>
                              </div>
                              <div className="ant-cell-master__container">
                                <div className="cell-master__first-row">{formatNumber(item.salePrice)}</div>
                                <div className="cell-master__second-row">
                                  {translate('items.price')}</div>
                              </div>
                              <div className="ant-cell-master__container">
                                <div className="cell-master__first-row">{formatNumber(item.retailPrice)}</div>
                                <div className="cell-master__second-row">
                                  {translate('items.retailPrice')}</div>
                              </div>
                            </div>

                          );
                        })
                      }
                    </Descriptions.Item>
                  </Row>
                  <Row className="mt-3">
                    <Descriptions title={translate("products.title.generalInfor")} column={1}>
                      <Descriptions.Item label={translate("products.category")}>
                        <span className="gradient-text">{previewModel?.category?.name}</span>
                      </Descriptions.Item>

                      <Descriptions.Item
                        label={translate("products.productType")}
                      >
                        <span className="gradient-text">
                          {previewModel?.productType?.name}
                        </span>
                      </Descriptions.Item>
                      <Descriptions.Item label={translate("products.scanCode")}>
                        <span className="gradient-text">
                          {previewModel.scanCode}
                        </span>
                      </Descriptions.Item>
                      <Descriptions.Item label={translate("products.brand")}>
                        <span className="gradient-text">
                          {previewModel?.brand?.name}
                        </span>
                      </Descriptions.Item>

                      <Descriptions.Item label={translate("products.otherName")}>
                        <span className="gradient-text">
                          {previewModel.otherName}
                        </span>
                      </Descriptions.Item>
                      <Descriptions.Item
                        label={translate("products.unitOfMeasure")}
                      >
                        <span className="gradient-text">
                          {previewModel?.unitOfMeasure?.name}
                        </span>
                      </Descriptions.Item>

                      <Descriptions.Item
                        label={translate("products.unitOfMeasureGrouping")}
                      >
                        <span className="gradient-text">
                          {previewModel?.unitOfMeasureGrouping?.name}
                        </span>
                      </Descriptions.Item>


                      <Descriptions.Item label={translate("products.eRPCode")}>
                        <span className="gradient-text">
                          {previewModel.eRPCode}
                        </span>
                      </Descriptions.Item>
                    </Descriptions>
                  </Row>
                  <Descriptions title={translate('products.productGrouping')} >
                    <div className="d-flex justify-content-start align-items-center" >


                      {previewModel?.productProductGroupingMappings &&
                        previewModel?.productProductGroupingMappings.length > 0 &&
                        previewModel.productProductGroupingMappings.map((content, index) => {
                          return (
                            <span className='product-grouping' key={index}>
                              {content?.productGrouping?.name}
                            </span>
                          );
                        })
                      }
                    </div>
                  </Descriptions>
                </div>

              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

export default ProductPreview;
