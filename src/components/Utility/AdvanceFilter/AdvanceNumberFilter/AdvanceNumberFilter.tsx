import { Model } from "@react3l/react3l/core";
import classNames from "classnames";
import React, { RefObject } from "react";
import "./AdvanceNumberFilter.scss";

export const DECIMAL: string = "DECIMAL";
export const LONG: string = "LONG";

export interface AdvanceNumberFilterProps<T extends Model> {
  value?: number;
  title?: string;
  allowPositive?: boolean;
  isMaterial?: boolean;
  isError?: boolean;
  numberType?: string;
  isReverseSymb?: boolean;
  decimalDigit?: number;
  placeHolder?: string;
  disabled?: boolean;
  className?: string;
  onChange?: (T: number) => void;
  onBlur?: (T: number) => void;
  onEnter?: (T: number) => void;
}

function AdvanceNumberFilter(props: AdvanceNumberFilterProps<Model>) {
  const {
    value,
    title,
    allowPositive,
    numberType,
    decimalDigit,
    isReverseSymb,
    placeHolder,
    disabled,
    isMaterial,
    className,
    onChange,
    onBlur,
    onEnter,
  } = props;

  const [internalValue, setInternalValue] = React.useState<string>("");

  const inputRef: RefObject<HTMLInputElement> = React.useRef<HTMLInputElement>(
    null,
  );

  const buildRegex = React.useCallback(() => {
    var regExDecimal = "";
    var regExString = "";
    for (let i = 1; i <= decimalDigit; i++) {
      regExDecimal += "\\d";
    }
    if (isReverseSymb) {
      regExString = "(\\d)(?=(?:\\d{3})+(?:,|$))|(," + regExDecimal + "?)\\d*$";
    } else {
      regExString =
        "(\\d)(?=(?:\\d{3})+(?:\\.|$))|(\\." + regExDecimal + "?)\\d*$";
    }
    return new RegExp(regExString, "g");
  }, [decimalDigit, isReverseSymb]);

  const formatString = React.useCallback(
    (inputValue: string): string => {
      const newRegEx = buildRegex();
      if (isReverseSymb) {
        switch (numberType) {
          case DECIMAL:
            if (allowPositive) {
              inputValue = inputValue
                .replace(/[^0-9,-]/g, "")
                .replace(",", "x")
                .replace(/,/g, "")
                .replace("x", ",")
                .replace(/(?!^)-/g, "");
            } else {
              inputValue = inputValue
                .replace(/[^0-9,]/g, "")
                .replace(",", "x")
                .replace(/,/g, "")
                .replace("x", ",");
            }
            return inputValue.replace(newRegEx, (m, s1, s2) => {
              return s2 || s1 + ".";
            });
          default:
            if (allowPositive) {
              inputValue = inputValue
                .replace(/[^0-9-]/g, "")
                .replace(/(?!^)-/g, "");
            } else {
              inputValue = inputValue.replace(/[^0-9]/g, "");
            }
            return inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
      } else {
        switch (numberType) {
          case DECIMAL:
            if (allowPositive) {
              inputValue = inputValue
                .replace(/[^0-9.-]/g, "")
                .replace(".", "x")
                .replace(/\./g, "")
                .replace("x", ".")
                .replace(/(?!^)-/g, "");
            } else {
              inputValue = inputValue
                .replace(/[^0-9.]/g, "")
                .replace(".", "x")
                .replace(/\./g, "")
                .replace("x", ".");
            }
            return inputValue.replace(newRegEx, (m, s1, s2) => {
              return s2 || s1 + ",";
            });
          default:
            if (allowPositive) {
              inputValue = inputValue
                .replace(/[^0-9-]/g, "")
                .replace(/(?!^)-/g, "");
            } else {
              inputValue = inputValue.replace(/[^0-9]/g, "");
            }
            return inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
      }
    },
    [isReverseSymb, numberType, buildRegex, allowPositive],
  );

  const parseNumber = React.useCallback(
    (value: string): [number, boolean] => {
      var isOutOfRange, number, stringValue;
      if (isReverseSymb) {
        stringValue = value.replace(/[,.]/g, (m) => (m === "." ? "," : "."));
        stringValue = stringValue.replace(/,/g, "");
      } else {
        stringValue = value.replace(/,/g, "");
      }
      switch (numberType) {
        case DECIMAL:
          isOutOfRange = stringValue.length > 21 ? true : false;
          number = parseFloat(stringValue);
          return [number, isOutOfRange];
        default:
          isOutOfRange = stringValue.length > 17 ? true : false;
          number = parseInt(stringValue);
          return [number, isOutOfRange];
      }
    },
    [numberType, isReverseSymb],
  );

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const stringValue = formatString(event.target.value);
      const isOutOfRange = parseNumber(stringValue)[1];
      if (!isOutOfRange) {
        setInternalValue(stringValue);
      }
    },
    [formatString, parseNumber],
  );

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setInternalValue("");
      inputRef.current.focus();
      if (typeof onChange === "function") {
        onChange(null);
        return;
      }
      if (typeof onBlur === "function") {
        onBlur(null);
        return;
      }
      if(typeof onEnter === "function") {
        onEnter(null);
        return;
      }
    },
    [onChange, onEnter, onBlur],
  );

  const handleKeyPress = React.useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        event.key === "Enter" &&
        event.currentTarget.value &&
        typeof onEnter === "function"
      ) {
        onEnter(parseNumber(event.currentTarget.value)[0]);
      }
    },
    [onEnter, parseNumber],
  );

  const handleBlur = React.useCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      if (event.target.value && typeof onBlur === "function") {
        onBlur(parseNumber(event.currentTarget.value)[0]);
      }
    },
    [onBlur, parseNumber],
  );

  React.useEffect(() => {
    if (value) {
      var stringValue = "" + value;
      if (isReverseSymb) {
        stringValue = stringValue.replace(/\./g, ",");
      }
      setInternalValue(formatString(stringValue));
    } else {
      setInternalValue("");
    }
  }, [value, formatString, isReverseSymb]);

  return (
    <>
      <div className='advance-number-filter__container'>
        {title && <div className='advance-number-filter__title'>{title}</div>}
        <div className='advance-number-filter__wrapper'>
          <input
            type='text'
            value={internalValue}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder={placeHolder}
            ref={inputRef}
            disabled={disabled}
            className={classNames("component__input", {
              "component__input--material": isMaterial,
              "component__input--bordered": !isMaterial,
              "disabled-field": disabled
            })}
          />
          {
            internalValue && !disabled ? 
            (
              <i
                className='advance-number-filter__icon tio-clear'
                onClick={handleClearInput}
              ></i>
            ) : 
              (
                className && (
                  <i className={classNames("advance-number-filter__icon", className)}></i>
              )
            )
          }
        </div>
      </div>
    </>
  );
}

AdvanceNumberFilter.defaultProps = {
  allowPositive: false,
  isReverseSymb: false,
  className: "",
  numberType: LONG,
  decimalDigit: 4,
  disabled: false,
  isMaterial: false
};

export default AdvanceNumberFilter;
