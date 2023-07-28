import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ofSalaryFilter, onDepartmentFilter } from "../features/employeeSlice";

const FilterDepartment = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const dispatch = useDispatch();
  const filterData = useSelector(
    (state) => state.employeeSlice.departmentFilterData
  );

  useEffect(() => {
    if (filterData.length == 0) {
      setSelectedDepartment("");
    }
  }, [filterData]);

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    dispatch(onDepartmentFilter(department));
    dispatch(ofSalaryFilter());
    // onChange(department);
  };

  const data = useSelector((state) => state.employeeSlice.employeeData);
  const departmentList = data.map((employee) => employee.department);
  var departmentsList = [];
  departmentList.map((department) =>
    departmentsList.includes(department) ? "" : departmentsList.push(department)
  );
  return (
    <div className="flex flex-1 justify-center">
      <div className="text-[20px] w-[300px]">Department Filter</div>
      <select
        value={selectedDepartment}
        onChange={handleDepartmentChange}
        className="block appearance-none w-[50%] bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="">All Departments</option>
        {departmentsList.map((department, index) => (
          <option key={index} value={department}>
            {department}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterDepartment;
