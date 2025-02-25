/* eslint-disable no-undef */
import { CFormInput } from "@coreui/react";
import React, { useEffect } from "react";

const DateRangePicker = ({ startDate, endDate, setStartDate, setEndDate }) => {
  useEffect(() => {
    $(function () {
      $('input[name="daterange"]')
        .daterangepicker({
          opens: "right",
          autoUpdateInput: true,
          startDate: startDate,
          endDate: endDate,
        })
        .on("apply.daterangepicker", function (ev, picker) {
          setStartDate(picker.startDate.format("YYYY-MM-DD"));
          setEndDate(picker.endDate.format("YYYY-MM-DD"));
        });
    });
  }, []);
  return <CFormInput type="text" name="daterange" />;
};

export default DateRangePicker;
