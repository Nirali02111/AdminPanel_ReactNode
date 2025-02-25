import React from "react";
import Select from "react-select";

interface ISmartDropdown {
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isRtl?: boolean;
  options: Array<{ label: number | string; value: number | string }>;
  onChange: (value: any) => void;
  value: { label: number | string; value: number | string } | null;
}
const SmartDropdown = ({
  isSearchable = true,
  isDisabled = false,
  isLoading = false,
  isClearable = true,
  isRtl = false,
  options,
  onChange,
  value,
}: ISmartDropdown) => {
  const colourOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        defaultValue={options[0]}
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isRtl={isRtl}
        isSearchable={isSearchable}
        name="color"
        options={options}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "#998fed" : "#b1b7c1",
            boxShadow: state.isFocused
              ? "0 0 0 0.25rem rgba(50, 31, 219, 0.25)"
              : "",
            borderRadius: "0.375rem",
          }),
          // menuList: (baseStyles) => ({
          //   ...baseStyles,
          //   backgroundColor: "red",
          // }),
        }}
        onChange={onChange}
        value={value || ""}
      />
      {/* #b1b7c1
      0.375rem */}
    </>
  );
};

export default SmartDropdown;
