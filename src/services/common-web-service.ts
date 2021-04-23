import { Model } from "@react3l/react3l/core";
import { TreeNode } from "components/Utility/Tree/TreeNode";
import moment, { Moment } from "moment";
import React, { RefObject } from "react";

export const commonWebService = {
  useClickOutside(ref: RefObject<any>, callback: () => void) {
    const handleClickOutside = React.useCallback(
      (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          if (typeof callback === "function") {
            callback();
          }
        }
      },
      [callback, ref],
    );

    React.useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      return function cleanup() {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [callback, handleClickOutside, ref]);
  },

  buildTree<T extends Model>(
    listItem: T[],
    parent?: TreeNode<T>,
    keyNodes?: number[],
    tree?: TreeNode<T>[],
  ): [TreeNode<T>[], number[]] {
    tree = typeof tree !== "undefined" ? tree : [];
    parent = typeof parent !== "undefined" ? parent : new TreeNode();
    keyNodes = typeof keyNodes !== "undefined" ? keyNodes : [];

    var children = listItem
      .filter((child) => {
        return child.parentId === parent.key;
      })
      .map((currentItem) => new TreeNode(currentItem));

    if (children && children.length) {
      if (parent.key === null) {
        tree = children;
      } else {
        parent.children = children;
        keyNodes.push(parent.key);
      }
      children.forEach((child) => {
        this.buildTree(listItem, child, keyNodes);
      });
    }

    return [tree, keyNodes];
  },

  toMomentDate(date: string): Moment {
    return moment(date);
  },

  isEmpty(obj: any) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  },

  limitWord(input: string, max: number) {
    if (input?.length > max) {
      input = input.slice(0, max);
      const output: string = input + "...";
      return output;
    }
    return input;
  },

  useStateCallback(initialState: any) {
    const [state, setState] = React.useState(initialState);
    const cbRef = React.useRef(null);
  
    const setStateCallback = React.useCallback((state, cb) => {
      cbRef.current = cb;
      setState(state);
    }, []);
  
    React.useEffect(() => {
      if (cbRef.current) {
        cbRef.current(state);
        cbRef.current = null; 
      }
    }, [state]);
  
    return [state, setStateCallback];
  }

};
