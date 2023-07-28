import { createSlice } from "@reduxjs/toolkit";
import employeeData from "../assets/initial_data";

const initialState = {
  employeeData: employeeData,
  employeeDataWithSalaryFilter: [],
  editDetails: {},
  departmentFilterData: [],
  departmentFilterDataWithSalaryFilter: [],
  salaryFilterApplied: false,
};

const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState,
  reducers: {
    addEmployee: (state, { payload }) => {
      state.employeeData.push(payload);
      state.filterdData = [];
    },
    editEmployee: (state, { payload }) => {
      state.editDetails = payload;
      console.log(state.editDetails);
    },
    updateEmployee: (state, { payload }) => {
      const index = payload.index;
      console.log(index);
      state.employeeData[index].name = payload.name;
      state.employeeData[index].department = payload.department;
      state.employeeData[index].salary = payload.salary;
      state.editDetails = {};
      state.filterdData = [];
      state.departmentFilterData = [];
    },
    deleteEmployee: (state, { payload }) => {
      const renderNewList = state.employeeData.filter(
        (employee) => employee.id !== payload
      );
      state.employeeData = renderNewList;
      state.employeeDataWithSalaryFilter = [];
      state.departmentFilterDataWithSalaryFilter = [];
      state.departmentFilterData = [];
      state.salaryFilterApplied = false;
    },
    onDepartmentFilter: (state, { payload }) => {
      var departmentFilterList;
      departmentFilterList = state.employeeData.filter((employee) =>
        employee.department.toLowerCase().match(payload.toLowerCase())
      );
      if (payload == "") {
        state.departmentFilterData = [];
      }
      state.departmentFilterData = departmentFilterList;
      state.salaryFilterApplied = false;
      console.log(departmentFilterList);
    },
    onSalaryFilter: (state) => {
      const compareSalaries = (a, b) => {
        const salaryA = parseInt(a.salary);
        const salaryB = parseInt(b.salary);
        return salaryA - salaryB;
      };
      state.salaryFilterApplied = true;
      if (state.departmentFilterData.length != 0) {
        state.departmentFilterDataWithSalaryFilter = state.departmentFilterData
          .slice()
          .sort(compareSalaries);
        console.log(state.departmentFilterData);
      } else {
        state.employeeDataWithSalaryFilter = state.employeeData
          .slice()
          .sort(compareSalaries);
      }
    },
    ofSalaryFilter: (state) => {
      state.employeeDataWithSalaryFilter = [];
      state.departmentFilterDataWithSalaryFilter = [];
      state.salaryFilterApplied = false;
    },
  },
});

export const {
  addEmployee,
  editEmployee,
  deleteEmployee,
  onDepartmentFilter,
  updateEmployee,
  onSalaryFilter,
  ofSalaryFilter,
} = employeeSlice.actions;
// export const getAllMovies = (state) => state.employeeSlice.movies;
// export const getAllSeries = (state) => state.employeeSlice.series;
// export const getSelectedMovieOrShow = (state) =>
//   state.employeeSlice.movieOrSeriesDetail;
// export const getDetailLoading = (state) => state.employeeSlice.detailsLoading;
export default employeeSlice.reducer;
