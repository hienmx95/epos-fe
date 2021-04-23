import React, { Reducer, useCallback } from "react";
import { Model, ErrorMap } from "@react3l/react3l/core";
import { Observable, Subscription } from "rxjs";
import { ValidateStatus } from "components/Utility/FormItem/FormItem";

export const FORM_DETAIL_SET_STATE_ACTION: string =
  "FORM_DETAIL_SET_STATE_ACTION";

export const FORM_DETAIL_CHANGE_SIMPLE_FIELD_ACTION: string =
  "FORM_DETAIL_CHANGE_SIMPLE_FIELD_ACTION";

export const FORM_DETAIL_CHANGE_OBJECT_FIELD_ACTION: string =
  "FORM_DETAIL_CHANGE_OBJECT_FIELD_ACTION";

export const FORM_DETAIL_CHANGE_TREE_FIELD_ACTION: string =
  "FORM_DETAIL_CHANGE_TREE_FIELD_ACTION";

export const FORM_DETAIL_CHANGE_MAPPING_FIELD_ACTION: string =
  "FORM_DETAIL_CHANGE_OBJECT_MAPPING_ACTION";

export interface FormDetailAction<T extends Model> {
  type: string;

  data?: T;

  fieldName?: keyof T;

  fieldValue?: T[keyof T][] | T[keyof T] | number;

  fieldValueMapping?: Model[];
}

function formDetailReducer<T extends Model>(
  state: T,
  action: FormDetailAction<T>
): T {
  switch (action.type) {
    case FORM_DETAIL_SET_STATE_ACTION:
      return action.data;

    case FORM_DETAIL_CHANGE_SIMPLE_FIELD_ACTION:
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
      };

    case FORM_DETAIL_CHANGE_OBJECT_FIELD_ACTION:
      return {
        ...state,
        [action.fieldName]: action.fieldValue,
        [`${action.fieldName}Id`]: (action.fieldValue as T[keyof T])?.id,
      };

    case FORM_DETAIL_CHANGE_TREE_FIELD_ACTION:
      const value = action.fieldValue as T[keyof T][];
      return {
        ...state,
        [action.fieldName]: [...value],
      };

    case FORM_DETAIL_CHANGE_MAPPING_FIELD_ACTION:
      const oldValue = state[action.fieldName] ? state[action.fieldName] : [];
      return {
        ...state,
        [action.fieldName]: [...oldValue, ...action.fieldValueMapping],
      };

    default:
      return state;
  }
}

export const formService = {
  useDetailForm<T extends Model>(
    ModelClass: new () => T,
    id: number | undefined,
    getDetail: (id: number) => Observable<T>,
    initData?: T
  ): [
    T,
    (fieldName: keyof T) => (fieldValue: T[keyof T]) => void,
    (
      fieldName: keyof T
    ) => (fieldIdValue: number, fieldValue?: T[keyof T]) => void,
    (data: T) => void,
    (
      fieldName: string,
      callback?: (id: number) => void
    ) => (list: T[keyof T][]) => void,
    (
      fieldName: string,
      callback?: (id: number) => void
    ) => (list: T[keyof T][]) => void,
    React.Dispatch<FormDetailAction<T>>,
    (fieldName: keyof T) => (fieldValue: T[keyof T]) => void
  ] {
    const [model, dispatch] = React.useReducer<Reducer<T, FormDetailAction<T>>>(
      formDetailReducer,
      initData ? initData : new ModelClass()
    );

    React.useEffect(() => {
      const subscription: Subscription = new Subscription();
      if (id) {
        subscription.add(
          getDetail(id).subscribe((model: T) => {
            dispatch({
              type: FORM_DETAIL_SET_STATE_ACTION,
              data: model,
            });
          })
        );
      }

      return function cleanup() {
        subscription.unsubscribe();
      };
    }, [getDetail, id]);

    const handleChangeSimpleField = React.useCallback(
      <P extends keyof T>(fieldName: P) => {
        return (fieldValue: T[keyof T]) => {
          let value: any = fieldValue;
          // handleValue of Switch
          if (typeof fieldValue?.target?.checked === "boolean") {
            value = fieldValue?.target?.checked;
          }
          dispatch({
            type: FORM_DETAIL_CHANGE_SIMPLE_FIELD_ACTION,
            fieldName,
            fieldValue: value,
          });
        };
      },
      []
    );

    const handleChangeMappingField = React.useCallback(
      <P extends keyof T>(fieldName: P) => {
        return (fieldValue: T[keyof T]) => {
          let value: any = fieldValue;
          dispatch({
            type: FORM_DETAIL_CHANGE_MAPPING_FIELD_ACTION,
            fieldName,
            fieldValueMapping: value,
          });
        };
      },
      []
    );

    // callback for control dependent field based on selected id of other field
    const handleChangeObjectField = React.useCallback(
      <P extends keyof T>(fieldName: P, callback?: (id: number) => void) => {
        return (fieldIdValue: number, fieldValue?: T[keyof T]) => {
          dispatch({
            type: FORM_DETAIL_CHANGE_OBJECT_FIELD_ACTION,
            fieldName,
            fieldValue,
          });
          if (typeof callback === "function") {
            callback(fieldIdValue);
          }
        };
      },
      []
    );

    const handleChangeTreeObjectField = React.useCallback(
      <P extends keyof T>(
        fieldName: P,
        callback?: (item: T[keyof T]) => void
      ) => {
        return (list: T[keyof T][]) => {
          dispatch({
            type: FORM_DETAIL_CHANGE_OBJECT_FIELD_ACTION,
            fieldName,
            fieldValue: list[0],
          });
          if (typeof callback === "function") {
            callback(list[0]);
          }
        };
      },
      []
    );

    const handleChangeTreeListField = React.useCallback(
      <P extends keyof T>(
        fieldName: P,
        callback?: (item: T[keyof T]) => void
      ) => {
        return (list: T[keyof T][]) => {
          dispatch({
            type: FORM_DETAIL_CHANGE_TREE_FIELD_ACTION,
            fieldName,
            fieldValue: list ? list : null,
          });
          if (typeof callback === "function") {
            callback(list[0]);
          }
        };
      },
      []
    );

    // allow external update model from hook's scope
    const handleUpdateNewModel = useCallback((data: T) => {
      dispatch({ type: FORM_DETAIL_SET_STATE_ACTION, data });
    }, []);

    return [
      model,
      handleChangeSimpleField,
      handleChangeObjectField,
      handleUpdateNewModel,
      handleChangeTreeObjectField,
      handleChangeTreeListField,
      dispatch,
      handleChangeMappingField,
    ];
  },

  useChangeHandler<T extends Model>(
    handleChangeField: (
      fieldName: keyof T,
      callback: (id: number) => void
    ) => (fieldValue: T[keyof T] | number) => void,
    fieldName: keyof T,
    callback?: (id: number) => void
  ) {
    return React.useCallback(handleChangeField(fieldName, callback), []);
  },

  useContentChangeHandler<T extends Model>(
    handleChangeField: (
      index: number,
      fieldName: keyof T
    ) => (fieldValue: T[keyof T]) => void,
    fieldName: keyof T,
    index: number
  ) {
    return React.useCallback(handleChangeField(index, fieldName), []);
  },

  useContentField<TContent extends Model>(
    ContentClass: new () => TContent,
    contentList: TContent[],
    setContentList: (t: TContent[]) => void
  ): [
    (
      key: string,
      field: keyof TContent
    ) => (value: TContent[keyof TContent]) => void,
    (key: string) => (content: TContent) => void,
    () => void,
    (index: number) => () => void
  ] {
    /* change one rows */
    const handleChangeContent = React.useCallback(
      (key: string) => (content: TContent) => {
        const index = contentList.findIndex((item) => item.key === key);
        contentList[index] = content;
        setContentList(contentList);
      },
      [contentList, setContentList]
    );

    /* change one cell */
    const handleChangeContentField = React.useCallback(
      (key: string, field: keyof TContent) => (
        value: TContent[keyof TContent]
      ) => {
        const index = contentList.findIndex((item) => item.key === key);
        if (index > 0) {
          contentList[index][field] = value;
        }
        setContentList(contentList);
      },
      [contentList, setContentList]
    );

    /* add one row */
    const handleAddContent = React.useCallback(() => {
      setContentList([...contentList, new ContentClass()]);
    }, [ContentClass, contentList, setContentList]);

    /* remove */
    const handleRemoveContent = React.useCallback(
      (index: number) => () => {
        contentList.splice(index, 1);
        setContentList([...contentList]);
      },
      [contentList, setContentList]
    );

    return [
      handleChangeContentField,
      handleChangeContent,
      handleAddContent,
      handleRemoveContent,
    ];
  },

  getValidationStatus<T extends Model>(errors: ErrorMap<T>, field: string) {
    if (typeof errors === "object" && errors !== null) {
      if (errors.hasOwnProperty("field")) {
        if (typeof errors[field] === "string" && errors[field] !== "") {
          return ValidateStatus.error;
        }
      }
    }
    return null;
  },
};
