import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, updateEmployee } from "../features/employeeSlice";
import ToggleSwitch from "./ToggleSwitch";
import FilterDepartment from "./FilterDepartment";

const Form = () => {
  const [name, setEmployeeName] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [errors, setErrors] = useState({});
  const [buttonText, setButtonText] = useState("Add Employee Details");

  const editDetails = useSelector((state) => state.employeeSlice.editDetails);
  const employeeData = useSelector((state) => state.employeeSlice.employeeData);
  const dispatch = useDispatch();
  //   console.log(Object.keys(editDetails).length);

  useEffect(() => {
    if (Object.keys(editDetails).length != 0) {
      setEmployeeName(editDetails.name);
      setDepartment(editDetails.department);
      setSalary(editDetails.salary);
      setButtonText("Update Employee Details");
    }
  }, [editDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    const errors = {};
    if (!name || !/^[a-zA-Z ]+$/.test(name)) {
      errors.name = "Please enter a valid employee name";
    }
    if (!department) {
      errors.department = "Please enter the department";
    }
    if (!salary || isNaN(salary)) {
      errors.salary = "Please enter a valid numeric salary";
    }

    if (Object.keys(errors).length === 0) {
      if (Object.keys(editDetails).length != 0) {
        const index = employeeData.indexOf(editDetails);
        console.log(index);
        console.log("Updated:", { name, department, salary });
        dispatch(updateEmployee({ name, department, salary, index }));
        setEmployeeName("");
        setDepartment("");
        setSalary("");
        setErrors({});
        setButtonText("Add Details");
      } else {
        const id = uuid();
        console.log("Submitted:", { name, department, salary, id });
        dispatch(addEmployee({ name, department, salary, id }));

        setEmployeeName("");
        setDepartment("");
        setSalary("");
        setErrors({});
      }
    } else {
      setErrors(errors);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-[50vh] min-w-[50vw] max-h-[50vh] sticky top-1 pt-[90px]">
      <div className="text-[20px] font-bold">{buttonText}</div>
      <form
        className="w-full max-w-[80%] p-4 space-y-4 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            htmlFor="name"
            className="block text-xl font-medium text-gray-700"
          >
            Employee Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setEmployeeName(e.target.value)}
            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-xl border ${
              errors.name ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="department"
            className="block text-xl font-medium text-gray-700"
          >
            Department
          </label>
          <input
            type="text"
            id="department"
            name="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-xl border ${
              errors.department ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.department && (
            <p className="mt-2 text-sm text-red-500">{errors.department}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="salary"
            className="block text-xl font-medium text-gray-700"
          >
            Salary
          </label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-xl border ${
              errors.salary ? "border-red-500" : "border-gray-300"
            } rounded-md`}
          />
          {errors.salary && (
            <p className="mt-2 text-sm text-red-500">{errors.salary}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full mt-[30px] flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {buttonText}
          </button>
        </div>
      </form>
      <ToggleSwitch />
      <FilterDepartment />
    </div>
  );
};

export default Form;
