import React, { RefObject } from "react";
import "./TextArea.scss";
import { Model } from "@react3l/react3l/core/model";
import classNames from "classnames";

interface TextAreaProps<T extends Model> {
  value?: string;
  isMaterial?: boolean;
  disabled?: boolean;
  placeHolder?: string;
  className?: string;
  onChange?: (T: string) => void;
  onBlur?: (T: string) => void;
}

function TextArea(props: TextAreaProps<Model>) {
  const {
    value,
    isMaterial,
    disabled,
    placeHolder,
    className,
    onChange,
    onBlur,
  } = props;

  const [internalValue, setInternalValue] = React.useState<string>("");

  const inputRef: RefObject<HTMLTextAreaElement> = React.useRef<
    HTMLTextAreaElement
  >(null);

  const handleChange = React.useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInternalValue(event.target.value);
      if (typeof onChange === "function") {
        onChange(event.target.value);
      }
    },
    [onChange],
  );

  const handleBlur = React.useCallback((event: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (typeof onBlur === "function") {
      onBlur(value);
    }
  }, [onBlur]);

  const handleClearInput = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      setInternalValue("");
      if (typeof onChange === "function") {
        onChange(null);
      }
      inputRef.current.focus();
    },
    [onChange],
  );

  React.useEffect(() => {
    if (value) {
      setInternalValue(value);
    } else {
      setInternalValue("");
    }
  }, [value]);

  return (
    <>
      <div className='text-area__container'>
        <textarea
          value={internalValue}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeHolder}
          ref={inputRef}
          disabled={disabled}
          className={classNames("component__text-area", {
            "component__text-area--material": isMaterial,
            "component__text-area--bordered": !isMaterial,
            "disabled-field": disabled
          })}
        ></textarea>
        {internalValue && !disabled ? (
          <i
            className='input-icon text-area__icon tio-clear'
            onClick={handleClearInput}
          ></i>
        ) : (
          className && (
            <i
              className={classNames("input-icon", "text-area__icon", className)}
            ></i>
          )
        )}
      </div>
    </>
  );
}

TextArea.defaultProps = {
  isMaterial: false,
  disabled: false,
  className: "",
};

export default TextArea;
