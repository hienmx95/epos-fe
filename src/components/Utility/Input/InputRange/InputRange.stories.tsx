import React, { Reducer } from "react";
import InputRange from "./InputRange";
import Radio, { RadioChangeEvent } from "antd/lib/radio";
import {
  advanceFilterReducer,
  AdvanceFilterAction,
  advanceFilterService,
} from "services/advance-filter-service";
import { ModelFilter } from "@react3l/react3l/core";
import { NumberFilter } from "@react3l/advanced-filters/NumberFilter";
import FormItem, { ValidateStatus } from "components/Utility/FormItem/FormItem";

class DemoFilter extends ModelFilter {
  number: NumberFilter = new NumberFilter();
}

export function InputRangeStories() {
  const [isMaterial, setIsMaterial] = React.useState(false);

  const [iconName, setIconName] = React.useState("");

  const handleChangeStyle = React.useCallback((event: RadioChangeEvent) => {
    setIsMaterial(event.target.value);
    if (event.target.value) {
      setIconName("tio-dollar");
    } else setIconName("");
  }, []);

  const [filter, dispatch] = React.useReducer<
    Reducer<DemoFilter, AdvanceFilterAction<DemoFilter>>
  >(advanceFilterReducer, new DemoFilter());

  const [
    numberRange,
    setNumberRange,
  ] = advanceFilterService.useNumberRangeFilter(filter, dispatch, "number");

  return (
    <div style={{ width: "250px", margin: "10px", backgroundColor: "#F2F2F2" }}>
      <InputRange
        isMaterial={isMaterial}
        placeHolderRange={["From...", "To..."]}
        valueRange={numberRange}
        className={iconName}
        onChangeRange={setNumberRange}
      />
      <div style={{ margin: "10px", width: "250px" }}>
        <FormItem
          validateStatus={ValidateStatus.error}
          message={"Field required!"}
          hasIcon={!isMaterial}
        >
          <InputRange
            isMaterial={isMaterial}
            placeHolderRange={["From...", "To..."]}
            valueRange={numberRange}
            className={iconName}
            onChangeRange={setNumberRange}
          />
        </FormItem>
      </div>
      <div style={{ margin: "10px", width: "300px" }}>
        <Radio.Group onChange={handleChangeStyle} value={isMaterial}>
          <Radio value={true}>Material Style</Radio>
          <Radio value={false}>Normal Style</Radio>
        </Radio.Group>
      </div>
    </div>
  );
}
