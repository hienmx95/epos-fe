import { Model } from "@react3l/react3l/core";
import { Table } from "antd";
import { ColumnProps } from "antd/lib/table";
import Pagination from "components/Utility/Pagination/Pagination";
import { TFunction } from "i18next";
import React, { ReactNode } from "react";
import { UseMaster } from "services/pages/master-service";
import nameof from "ts-nameof.macro";

export interface AppMainMasterTableProps extends UseMaster {
  columns?: ColumnProps<Model>[];
  translate?: TFunction;
  repository?: any;
  children?: ReactNode;
  isDragable?: boolean;
  isShowTitle?: boolean;
}

export function AppMainMasterTable(props: AppMainMasterTableProps) {
  const {
    list,
    columns,
    filter,
    loadingList,
    rowSelection,
    total,
    translate,
    handleTableChange,
    handlePagination,
    isDragable,
    isShowTitle
  } = props;

  React.useEffect(() => {
    const antTable = document.getElementsByClassName("ant-table-body")[0] as HTMLElement;
    let isDown = false;
    let startX;
    let scrollLeft;

    if (isDragable) {
      const handleMouseDown = (e: any) => {
        isDown = true;
        antTable.classList.add('active-draggable');
        startX = e.pageX - antTable.offsetLeft;
        scrollLeft = antTable.scrollLeft;
      };

      const handleMouseLeave = () => {
        isDown = false;
        antTable.classList.remove('active-draggable');
      };

      const handleMouseUp = () => {
        isDown = false;
        antTable.classList.remove('active-draggable');
      };

      const handleMouseMove = (e: any) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - antTable.offsetLeft;
        const walk = (x - startX) * 3;
        antTable.scrollLeft = scrollLeft - walk;
      };

      antTable.addEventListener('mousedown', handleMouseDown);

      antTable.addEventListener('mouseleave', handleMouseLeave);

      antTable.addEventListener('mouseup', handleMouseUp);

      antTable.addEventListener('mousemove', handleMouseMove);

      return () => {
        antTable.removeEventListener('mousedown', handleMouseDown);
        antTable.removeEventListener('mouseleave', handleMouseLeave);
        antTable.removeEventListener('mouseup', handleMouseUp);
        antTable.removeEventListener('mousemove', handleMouseMove);
      };
    }

  }, [isDragable]);

  return (
    <>
      <div className="page__master-table custom-scrollbar">
        <Table
          rowKey={nameof(list[0].id)}
          columns={columns}
          pagination={false}
          dataSource={list}
          loading={loadingList}
          onChange={handleTableChange}
          rowSelection={rowSelection}
          scroll={{ y: 500 }}
          title={() => (
            <>
              {isShowTitle &&
                <div className="d-flex justify-content-between">
                  <div className="master-table_title">{total} {translate('general.title.result')}</div>
                  <div className="flex-shrink-1 d-flex align-items-center">
                    <Pagination
                      skip={filter.skip}
                      take={filter.take}
                      total={total}
                      onChange={handlePagination}
                      style={{ margin: "10px" }}
                    />
                  </div>
                </div>
              }
            </>
          )}
        />
      </div>
    </>
  );
}

AppMainMasterTable.defaultProps = {
  isDragable: false,
  isShowTitle: true
};