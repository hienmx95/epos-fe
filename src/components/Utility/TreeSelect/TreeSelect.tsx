import React, { RefObject, Reducer } from "react";
import "./TreeSelect.scss";
import { Model } from "@react3l/react3l/core/model";
import { ModelFilter } from "@react3l/react3l/core/model-filter";
import Tree from "../Tree/Tree";
import { debounce } from "@react3l/react3l/helpers";
import { DEBOUNCE_TIME_300 } from "@react3l/react3l/config";
import { Observable } from "rxjs";
import nameof from "ts-nameof.macro";
import { commonWebService } from "services/common-web-service";
import { StringFilter } from "@react3l/advanced-filters/StringFilter";
import InputTag from "../Input/InputTag/InputTag";
import InputSelect from "../Input/InputSelect/InputSelect";

export interface TreeSelectProps<
  T extends Model,
  TModelFilter extends ModelFilter
> {
  title?: string;
  listItem?: Model[];
  item?: Model;
  isMaterial?: boolean;
  searchProperty?: string;
  searchType?: string;
  checkable?: boolean;
  selectable?: boolean;
  checkStrictly?: boolean;
  disabled?: boolean;
  modelFilter?: TModelFilter;
  placeHolder?: string;
  error?: string;
  render?: (T: T) => string;
  getTreeData?: (TModelFilter?: TModelFilter) => Observable<T[]>;
  onChange?: (T: Model[], TT: boolean) => void;
  classFilter?: new () => TModelFilter;
}
export interface filterAction<T extends Model> {
  type: string;
  data?: ModelFilter;
}

function filterReducer(
  state: ModelFilter,
  action: filterAction<Model>
): ModelFilter {
  switch (action.type) {
    case "UPDATE":
      return action.data;
  }
  return;
}

function TreeSelect(props: TreeSelectProps<Model, ModelFilter>) {
  const {
    listItem,
    item,
    isMaterial,
    checkStrictly,
    searchProperty,
    searchType,
    checkable,
    selectable,
    disabled,
    classFilter: ClassFilter,
    modelFilter,
    placeHolder,
    render,
    getTreeData,
    onChange,
  } = props;

  const [expanded, setExpanded] = React.useState<boolean>(false);

  const listIds = React.useMemo(() => {
    if (item) return [item.id];
    if (listItem) return listItem.map((currentItem) => currentItem?.id);
    return [];
  }, [listItem, item]);

  const wrapperRef: RefObject<HTMLDivElement> = React.useRef<HTMLDivElement>(
    null
  );

  const [filter, dispatch] = React.useReducer<
    Reducer<ModelFilter, filterAction<Model>>
  >(filterReducer, new ClassFilter());

  const handleClearItem = React.useCallback(
    (item: Model) => {
      if (checkable) {
        const newListItem = listItem.filter(
          (currentItem) => currentItem.id !== item?.id
        );
        onChange(newListItem, checkable);
      } else {
        onChange([null], checkable);
      }
    },
    [listItem, onChange, checkable]
  );

  const handleSearchItem = React.useCallback(
    debounce((searchTerm: string) => {
      const cloneFilter = modelFilter ? { ...modelFilter } : { ...filter };
      cloneFilter[searchProperty][searchType] = searchTerm;
      dispatch({ type: "UPDATE", data: cloneFilter });
    }, DEBOUNCE_TIME_300),
    []
  );

  const handleCloseList = React.useCallback(() => {
    setExpanded(false);
  }, []);

  const handleExpand = React.useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!expanded) {
        const filterData = modelFilter ? { ...modelFilter } : new ClassFilter();
        dispatch({ type: "UPDATE", data: filterData });
      }
      setExpanded(true);
    },
    [ClassFilter, expanded, modelFilter]
  );

  const handleOnchange = React.useCallback(
    (selectedNodes: Model[]) => {
      onChange([...selectedNodes], checkable);
      if (!checkable) setExpanded(false);
    },
    [onChange, checkable]
  );

  commonWebService.useClickOutside(wrapperRef, handleCloseList);

  return (
    <>
      <div className="tree-select__container" ref={wrapperRef}>
        <div className="tree-select__input" onClick={handleExpand}>
          {checkable ? (
            <InputTag
              listItem={listItem}
              isMaterial={isMaterial}
              render={render}
              placeHolder={placeHolder}
              disabled={disabled}
              onSearch={handleSearchItem}
              onClear={handleClearItem}
            />
          ) : (
            <InputSelect
              model={item}
              render={render}
              isMaterial={isMaterial}
              placeHolder={placeHolder}
              expanded={expanded}
              disabled={disabled}
              onSearch={handleSearchItem}
              onClear={handleClearItem}
            />
          )}
        </div>
        {expanded && (
          <div className="tree-select__list">
            <Tree
              getTreeData={getTreeData}
              checkedKeys={listIds}
              modelFilter={filter}
              checkStrictly={checkStrictly}
              height={300}
              onChange={handleOnchange}
              selectable={selectable}
              checkable={checkable}
              titleRender={render}
            />
          </div>
        )}
      </div>
    </>
  );
}

TreeSelect.defaultProps = {
  placeHolder: `Select ${nameof(TreeSelect)}...`,
  searchProperty: nameof(Model.prototype.name),
  searchType: nameof(StringFilter.prototype.startWith),
  classFilter: ModelFilter,
  isMaterial: false,
  checkable: false,
  disabled: false,
  selectable: true,
};

export default TreeSelect;
