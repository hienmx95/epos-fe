import { Model } from "@react3l/react3l/core";
import { TreeProps as AntTreeProps } from "antd/lib/tree";
import classNames from "classnames";
import React, { ReactElement } from "react";
import TreeNode from "../TreeList/TreeNode/TreeNode";
import "./TreeList.scss";

export interface TreeProps<T> extends AntTreeProps {
  className?: string;

  parent?: T;

  tree?: T[];

  nodePadding?: number;

  children?: ReactElement<any> | ReactElement<any>[];

  nodeLevel?: number;

  onAdd?(node: T): () => void;

  onChange?(value: T[]): void;

  onDelete?(node: T): () => void;

  onEdit?(node: T): () => void;

  onPreview?(id: any): () => void;
}

export function TreeList<T extends Model>(props: TreeProps<T>) {
  const {
    tree,
    className,
    onAdd,
    onEdit,
    onPreview,
    onDelete,
    nodeLevel,
    nodePadding,
    children,
  } = props;

  return (
    <ul className={classNames("tree", className)}>
      {typeof children === "object" ? (
        children
      ) : (
        <>
          {tree?.map((node: T, index) => {
            return (
              <TreeNode
                key={index}
                node={node}
                onAdd={onAdd}
                onPreview={onPreview}
                onEdit={onEdit}
                onDelete={onDelete}
                nodeLevel={nodeLevel}
                nodePadding={nodePadding}
              ></TreeNode>
            );
          })}
        </>
      )}
    </ul>
  );
}
