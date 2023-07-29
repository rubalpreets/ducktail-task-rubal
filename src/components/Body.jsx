import React, { useReducer } from "react";
import Form from "./Form";
import EmployeeList from "./EmployeeList";

const Body = () => {
  return (
    <div className="flex flex-1 min-w-[70vw]">
      <div>
        <Form />
      </div>
      <EmployeeList />
    </div>
  );
};

export default Body;
