import { Card, Menu, Dropdown, Button, Tooltip } from "antd";
import InputSearch from "components/Utility/InputSearch/InputSearch";
import { TFunction } from "i18next";
import { CSSTransition } from "react-transition-group";
import React, { ReactNode } from "react";
import { UseMaster } from "services/pages/master-service";
import classNames from "classnames";
import { DownOutlined } from "@ant-design/icons";

export interface AppMainMasterFilterProps extends UseMaster {
  translate: TFunction;
  children: ReactNode;
  repository: any;
}

export function AppMainMasterFilter(props: AppMainMasterFilterProps) {
  const {
    toggle,
    importButtonRef,
    filter,
    repository,
    translate,
    handleToggleSearch,
    handleGoCreate,
    handleListExport,
    handleImportList,
    handleExportTemplateList,
    children,
    handleServerBulkDelete,
    canBulkDelete,
  } = props;
  
  const menu = React.useMemo(
    () => (
      <Menu>
        <Menu.Item key="2">
          <Tooltip title={translate("general.button.importExcel")}>
            <>
              <input
                ref={importButtonRef}
                type="file"
                style={{ display: "none" }}
                id="master-import"
                onChange={handleImportList(repository.import)}
              />
              <div
                className="ant-action-menu"
                onClick={() => {
                  importButtonRef.current.click();
                }}
              >
                {translate("general.actions.importExcel")}
              </div>
            </>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="3">
          <Tooltip title={translate("general.button.exportExcel")}>
            <div
              className="ant-action-menu"
              onClick={handleListExport(filter, repository.export)}
            >
              {translate("general.actions.exportExcel")}
            </div>
          </Tooltip>
        </Menu.Item>
        <Menu.Item key="4">
          <Tooltip title={translate("general.button.downloadTemplate")}>
            <div
              className="ant-action-menu"
              onClick={handleExportTemplateList(repository.exportTemplate)}
            >
              {translate("general.actions.exportTemplate")}
            </div>
          </Tooltip>
        </Menu.Item>
      </Menu>
    ),
    [
      handleImportList,
      handleExportTemplateList,
      filter,
      handleListExport,
      importButtonRef,
      repository.import,
      repository.export,
      repository.exportTemplate,
      translate,
    ]
  );

  return (
    <>
      <div className="page__search">
        <Card bordered={false}>
          <div className="d-flex align-items-center">
            <div className="d-flex flex-grow-1">
              <div className="pr-4 w70">
                <InputSearch />
              </div>

              <button
                className={classNames(
                  "btn component__btn-filter mr-3 grow-animate-1 btn-customize",
                  toggle === true ? "component__btn-filter-active" : ""
                )}
                onClick={handleToggleSearch}
              >
                <i className="tio-tune_horizontal "></i>
                <span className="component_btn-text">
                  {translate("general.button.advance")}
                </span>
              </button>

              {/* <button
                className="btn component__btn-toggle grow-animate-1 reset-filter"
                onClick={handleResetFilter}
              >
                <i className="tio-restore reset-icon"></i>
                <span className="component_btn-text reset-label">
                  {translate("general.button.reset")}
                </span>
              </button> */}
            </div>

            <div className="d-flex justify-content-around ml-4 ">
              <button
                className="btn component__btn-cancel component__btn-toggle grow-animate-1 btn-customize mr-3"
                onClick={handleServerBulkDelete}
                disabled={!canBulkDelete}
              >
                <i className="tio-clear"></i>
                <span className="component_btn-text">
                  {translate("general.actions.delete")}
                </span>
              </button>
              <button
                className="btn component__btn-toggle grow-animate-1 btn-customize"
                onClick={handleGoCreate}
              >
                <i className="tio-add"></i>
                <span className="component_btn-text">
                  {translate("general.actions.create")}
                </span>
              </button>
              <div className="table__action">
                <Dropdown overlay={menu} trigger={["click"]}>
                  <Button>
                    <span className="component_btn-text">
                      {translate("general.actions.action")}
                    </span>
                    <DownOutlined />
                  </Button>
                </Dropdown>
              </div>
            </div>
          </div>
          <CSSTransition
            in={toggle}
            timeout={100}
            classNames={"show"}
            unmountOnExit
          >
            {children}
          </CSSTransition>
        </Card>
      </div>
    </>
  );
}
