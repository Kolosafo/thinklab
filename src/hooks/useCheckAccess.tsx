import { IRootState } from "@/redux/store";
import { useSelector } from "react-redux";

export const useCheckAccess = () => {
  const {
    isComms,
    isLegal,
    isMarketing,
    isMasterAdmin,
    isProjectManagement,
    isLogged,
  } = useSelector((store: IRootState) => store.user);
  const checkAccess =
    !isComms &&
    !isLegal &&
    !isMarketing &&
    !isMasterAdmin &&
    !isProjectManagement &&
    !isLogged;
  return {
    fullAccessCheck: checkAccess,
    isComms,
    isLegal,
    isMarketing,
    isMasterAdmin,
    isProjectManagement,
    isLogged,
  };
};
