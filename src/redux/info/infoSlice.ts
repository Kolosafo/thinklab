import { FullAboutData } from "@/app/(admin)/admin/about/aboutForm";
// import { CompanyInfoData } from "@/hooks/useCompanyInfo";
import { TeamMemberData } from "@/hooks/useCreateTeam";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type LandingDataType = {
  title: string;
  description: string;
  bgVideo: string | null;
};
export type contactUsType = {
  id?: string;
  headerTitle: string;
  description: string;
  mainImg: string;
  subImg: string;
};
type initialStateType = {
  companyInfo: FullAboutData;
  teamMembers: TeamMemberData[];
  projectTitle: string;
  landingInfo: LandingDataType;
  contactUs: contactUsType;
};
const initailState: initialStateType = {
  companyInfo: {
    aboutTitle: "",
    image: "",
    aboutInfo: "",
    mission: "",
    vision: "",
    projectsCompleted: 0,
    clients: 0,
    expYear: 0,
    awardWon: 0,
    teamMemberSize: 0,
    homesBuild: 0,
  },
  landingInfo: {
    title: "",
    description: "",
    bgVideo: null,
  },
  contactUs: {
    headerTitle: "",
    description: "",
    mainImg: "",
    subImg: "",
  },
  projectTitle: "",
  teamMembers: [],
};
const infoSlice = createSlice({
  name: "projects",
  initialState: initailState,
  reducers: {
    updateAbout: (state, action: PayloadAction<string>) => {
      state.companyInfo = {
        ...state.companyInfo,
        aboutInfo: action.payload,
      };
    },
    updateProjectTitle: (state, action: PayloadAction<string>) => {
      state.projectTitle = action.payload;
    },
    loadCompanyInfo: (state, action: PayloadAction<FullAboutData>) => {
      state.companyInfo = action.payload;
    },
    loadContactUs: (state, action: PayloadAction<contactUsType>) => {
      state.contactUs = action.payload;
    },
    loadLandingData: (state, action: PayloadAction<LandingDataType>) => {
      state.landingInfo = action.payload;
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
  updateProjectTitle,
  loadCompanyInfo,
  updateTeamMember,
  addTeamMember,
  deleteTeamMember,
  loadTeam,
  loadLandingData,
  loadContactUs,
} = infoSlice.actions;
export default infoSlice.reducer;
