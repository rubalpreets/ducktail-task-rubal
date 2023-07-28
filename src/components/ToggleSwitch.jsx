import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ofSalaryFilter, onSalaryFilter } from "../features/employeeSlice";

const Button = () => {
  //   useSelector((state) => state.employeeSlice.employeeData);
  //   useSelector((state) => state.employeeSlice.departmentFilterData);
  const dispatch = useDispatch();
  const [filterText, setFilterText] = useState("Filter: Off");
  const salaryFilterApplied = useSelector(
    (state) => state.employeeSlice.salaryFilterApplied
  );

  useEffect(() => {
    if (salaryFilterApplied === false) {
      setFilterText("Filter: Off");
    } else {
      setFilterText("Filter: Applied");
    }
  }, [salaryFilterApplied]);

  const handleClick = () => {
    if (filterText == "Filter: Off") {
      setFilterText("Filter: Applied");
      dispatch(onSalaryFilter());
    } else {
      setFilterText("Filter: Off");
      dispatch(ofSalaryFilter());
    }
  };

  return (
    <div className="flex items-center justify-center my-[20px] ">
      <button
        className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        onClick={handleClick}
      >
        Salary Low To High
      </button>
      <div className="ml-[10px] text-xl">{filterText}</div>
    </div>
  );
};

export default Button;
