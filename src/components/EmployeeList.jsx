import React from "react";
import EmployeeCard from "./EmployeeCard";

import { useSelector } from "react-redux";

const EmployeeList = (props) => {
  const employeeData = useSelector((state) => state.employeeSlice.employeeData);
  const employeeDataWithSalaryFilter = useSelector(
    (state) => state.employeeSlice.employeeDataWithSalaryFilter
  );
  const departmentFilterData = useSelector(
    (state) => state.employeeSlice.departmentFilterData
  );
  const departmentFilterDataWithSalaryFilter = useSelector(
    (state) => state.employeeSlice.departmentFilterDataWithSalaryFilter
  );

  var renderEmployeeList;
  var dataArray;

  if (departmentFilterDataWithSalaryFilter.length != 0) {
    dataArray = departmentFilterDataWithSalaryFilter;
    renderEmployeeList = departmentFilterDataWithSalaryFilter.map(
      (employee) => {
        // console.log(employee.id);
        return (
          <div key={employee.id}>
            <EmployeeCard employee={employee} />
          </div>
        );
      }
    );
  } else if (departmentFilterData.length != 0) {
    dataArray = departmentFilterData;

    renderEmployeeList = departmentFilterData.map((employee) => {
      // console.log(employee.id);
      return (
        <div key={employee.id}>
          <EmployeeCard employee={employee} />
        </div>
      );
    });
  } else if (employeeDataWithSalaryFilter.length != 0) {
    dataArray = employeeDataWithSalaryFilter;

    renderEmployeeList = employeeDataWithSalaryFilter.map((employee) => {
      // console.log(employee.id);
      return (
        <div key={employee.id}>
          <EmployeeCard employee={employee} />
        </div>
      );
    });
  } else {
    dataArray = employeeData;

    renderEmployeeList = employeeData.map((employee) => {
      // console.log(employee.id);
      return (
        <div key={employee.id}>
          <EmployeeCard employee={employee} />
        </div>
      );
    });
  }

  const compareSalaries = (a, b) => {
    const salaryA = parseInt(a.salary);
    const salaryB = parseInt(b.salary);
    return salaryA - salaryB;
  };

  const dummy = dataArray.slice().sort(compareSalaries);
  const highestSalary = dummy[dummy.length - 1].salary;
  const lowSalary = dummy[0].salary;

  return (
    <div className="flex flex-col flex-1 items-center">
      <div className="text-[20px] font-bold">Employee List</div>
      <div>{`Highest Salary: ${highestSalary}`}</div>
      <div>{`Lowest Salary: ${lowSalary}`}</div>
      <div>{`Total ${renderEmployeeList.length} employees found`}</div>
      <div className="max-w-[80%] w-full">{renderEmployeeList}</div>
    </div>
  );
};

export default EmployeeList;
