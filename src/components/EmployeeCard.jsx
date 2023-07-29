import React from "react";
import { useDispatch } from "react-redux";
import { deleteEmployee, editEmployee } from "../features/employeeSlice";

const EmployeeCard = (props) => {
  // console.log(name);

  const handleEditEmployee = (data) => {
    dispatch(editEmployee(data));
  };

  const dispatch = useDispatch();

  const handleDeleteEmployee = (id) => {
    console.log(id);
    dispatch(deleteEmployee(id));
  };

  return (
    <div className="flex items-center justify-between bg-white w-full h-[100px] rounded-lg shadow-md p-4 mb-4">
      <div className="flex-1">
        <p className="text-lg font-medium">{props.employee.name}</p>
        {/* <p className="text-gray-600">ID: {id}</p> */}
        <p className="text-gray-600">Department: {props.employee.department}</p>
        <p className="text-gray-600">Salary: {props.employee.salary}</p>
      </div>
      <div className="flex space-x-2">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onClick={() => {
            console.log(`Editing employee with ID ${props.employee.id}`);
            handleEditEmployee(props.employee);
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
          onClick={() => {
            console.log(`Deleting employee with ID ${props.employee.id}`);
            handleDeleteEmployee(props.employee.id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
