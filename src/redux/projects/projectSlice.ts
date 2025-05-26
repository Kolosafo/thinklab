import { ProjectCreationData } from "@/hooks/useCreateProject";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  projects: ProjectCreationData[];
};
const initailState: initialStateType = {
  projects: [],
};
const projectSlice = createSlice({
  name: "projects",
  initialState: initailState,
  reducers: {
    addProject: (state, action: PayloadAction<ProjectCreationData>) => {
      state.projects = [...state.projects, action.payload];
    },
    loadProjects: (state, action: PayloadAction<ProjectCreationData[]>) => {
      state.projects = action.payload;
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      const filterOutProjects = state.projects.filter(
        (proj) => proj.id !== action.payload
      );
      state.projects = filterOutProjects;
    },
    updateProject: (state, action: PayloadAction<ProjectCreationData>) => {
      const _updateProject = action.payload;

      const index = state.projects.findIndex(
        (app) => app.id === _updateProject.id
      );

      if (index !== -1) {
        state.projects[index] = {
          ...state.projects[index],
          ..._updateProject,
        };
      }
    },
    // loadApplications: (state, action: PayloadAction<KYCFormData[]>) => {
    //   state.agents = action.payload;
    // },
  },
});

export const {
  addProject,
  loadProjects,
  updateProject,
  deleteProject,
  //   loadApplications,
  //   updateApplications,
} = projectSlice.actions;
export default projectSlice.reducer;
