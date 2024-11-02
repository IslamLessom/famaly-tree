import React from "react";
import { Select } from "antd";

const SelectInfo = ({ options, onChange, ...props }) => {
  return (
    <Select onChange={onChange} {...props}>
      {options.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SelectInfo;
