import { CompanyInfoData } from "@/hooks/useCompanyInfo";
import { TeamMemberData } from "@/hooks/useCreateTeam";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
  companyInfo: CompanyInfoData;
  teamMembers: TeamMemberData[];
};
const initailState: initialStateType = {
  companyInfo: {
    about: "",
    projectListingData: "",
  },
  teamMembers: [],
};
const infoSlice = createSlice({
  name: "projects",
  initialState: initailState,
  reducers: {
    updateAbout: (state, action: PayloadAction<string>) => {
      state.companyInfo = {
        ...state.companyInfo,
        about: action.payload,
      };
    },
    updateProjectListingData: (state, action: PayloadAction<string>) => {
      state.companyInfo = {
        ...state.companyInfo,
        projectListingData: action.payload,
      };
    },
    loadCompanyInfo: (state, action: PayloadAction<CompanyInfoData>) => {
      state.companyInfo = action.payload;
    },

    //TODO:  TEAM MEMBERS
    loadTeam: (state, action: PayloadAction<TeamMemberData[]>) => {
      state.teamMembers = action.payload;
    },
    updateTeamMember: (state, action: PayloadAction<TeamMemberData>) => {
      const _updateProject = action.payload;

      const index = state.teamMembers.findIndex(
        (app) => app.id === _updateProject.id
      );

      if (index !== -1) {
        state.teamMembers[index] = {
          ...state.teamMembers[index],
          ..._updateProject,
        };
      }
    },
    addTeamMember: (state, action: PayloadAction<TeamMemberData>) => {
      state.teamMembers = [...state.teamMembers, action.payload];
    },
    deleteTeamMember: (state, action: PayloadAction<TeamMemberData>) => {
      const removeMember = state.teamMembers.filter(
        (mem) => mem.id !== action.payload.id
      );
      state.teamMembers = removeMember;
    },
  },
});

export const {
  updateAbout,
  updateProjectListingData,
  loadCompanyInfo,
  updateTeamMember,
  addTeamMember,
  deleteTeamMember,
  loadTeam
} = infoSlice.actions;
export default infoSlice.reducer;
