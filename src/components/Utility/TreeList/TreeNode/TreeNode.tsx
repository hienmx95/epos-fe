import { Model } from "@react3l/react3l/core";
import { Button, Dropdown, Menu } from "antd";
import classNames from "classnames";
import React, { ReactElement, ReactNode } from "react";
import { TreeList } from "../TreeList";
import "./TreeNode.scss";

export interface TreeNodeProps<T extends Model> {
  node?: T;

  nodeLevel?: number;

  nodePadding?: number;

  children?: ReactElement<any> | ReactElement<any>[];

  onPreview?(id: any): () => void;

  onAdd?(node: T): () => void;

  onEdit?(node: T): () => void;

  onDelete?(node: T): () => void;

  onChange?(value: T[]): void;

  render?(node: T): ReactNode;
}

function TreeNode<T extends Model>(props: TreeNodeProps<T>) {
  const {
    node,
    onAdd,
    onPreview,
    onDelete,
    onEdit,
    render,
    nodeLevel,
    nodePadding,
  } = props;
  const hasChildren: boolean = node?.children?.length > 0;

  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  const handleToggle = React.useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const menuCRUD = (
    <Menu>
      <Menu.Item>
        {typeof onAdd === "function" && (
          <div onClick={onAdd(node?.item)}>Tạo con</div>
        )}
      </Menu.Item>
      <Menu.Item>
        {typeof onPreview === "function" && (
          <div onClick={onPreview(node?.item?.id)}>Xem</div>
        )}
      </Menu.Item>

      <Menu.Item>
        {typeof onEdit === "function" && (
          <div onClick={onEdit(node?.item)}>Sửa</div>
        )}
      </Menu.Item>
      {node?.item?.used && (
        <Menu.Item>
          {typeof onDelete === "function" && (
            <div onClick={onDelete(node?.item)}>Xóa</div>
          )}
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <li className="" key={node?.id}>
      <div
        className="tree-list-item-level"
        style={{ paddingLeft: "26px" }}
        // style={{ paddingLeft: "26px" }}
      >
        <div className="tree-list-item-icon-1">
          <i
            role="button"
            onClick={handleToggle}
            className={classNames("mr-2 node-toggler", {
              show: hasChildren,
              "tio-chevron_right": !isExpanded && hasChildren,
              "tio-chevron_down": isExpanded && hasChildren,
            })}
          />
        </div>
        {render(node)}
        <div className="tree-list-item-icon-2">
          <Dropdown overlay={menuCRUD}>
            <a
              href="/"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <i
                className="tio-more_horizontal"
                style={{ color: "#000000" }}
              ></i>
            </a>
          </Dropdown>
        </div>
      </div>
      {/* <ul> */}
      {hasChildren && (
        <>
          {isExpanded && <></>}
          <ul style={{ marginLeft: `${133}px` }}>
            <TreeList
              key={node.id}
              tree={node.children}
              className={classNames("sub-tree", {
                expanded: isExpanded,
              })}
              parent={node}
              onAdd={onAdd}
              onEdit={onEdit}
              onDelete={onDelete}
              onPreview={onPreview}
              nodeLevel={nodeLevel + 1}
              nodePadding={nodePadding}
            />
          </ul>
        </>
      )}
      {/* </ul> */}
    </li>
  );
}

TreeNode.defaultProps = {
  nodeLevel: 0,
  nodePadding: 12,
  render<T extends Model>(node: T) {
    return (
      <>
        <div
          className="tree-list-item-info d-flex align-items-center"
          key={node?.id}
        >
          <div className="tree-list-item-img">
            <img src={node?.item?.image?.url} alt="" />
          </div>

          <div
            className="tree-list-item-text"
            //   style={{ width: `calc(878px - ${node.item.level * 133}px )` }}
          >
            <div className="tree-list-item-text-1">{node.title}</div>
            <div className="tree-list-item-text-2">{node.item.id}</div>
          </div>
        </div>

        <div className="tree-list-item-btn" key={node?.id}>
          <Button className="tl-btn-active">{node?.item?.status?.name}</Button>
        </div>
      </>
    );
  },
};

export default TreeNode;
