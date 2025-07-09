import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCRFrtcLU1bfzT7md5_4p_4HdmucDEDguw",
  authDomain: "occasion-craft-50f7a.firebaseapp.com",
  projectId: "occasion-craft-50f7a",
  storageBucket: "occasion-craft-50f7a.appspot.com",
  messagingSenderId: "136659100435",
  appId: "1:136659100435:web:dfc9437cf19806908f30e6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

export const imgStorageRef = getStorage(app);
export const db = getFirestore(app);
export const companyCollectionRef = collection(db, "company");
export const agentCollectionRef = collection(db, "agent_data");
export const propertyCollectionRef = collection(db, "properties");
export const projectsCollectionRef = collection(db, "projects");
export const aboutCollectionRef = collection(db, "about");
export const companyInfoRef = collection(db, "thinklab-site-info");
export const contactUsInfoRef = collection(db, "contactUs");
export const adminLoginRef = collection(db, "adminLogins");
// export const userInfoCollectionRef = collection(db, "userInfo");
