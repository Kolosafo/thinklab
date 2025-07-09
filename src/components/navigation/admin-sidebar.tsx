"use client"
import {
  Home,
  Plus,
  ChartBar,
  FileUser,
  Hammer,
  LetterText,
  BookCheck,
  List,
  User,
  LandPlot,
  Phone,
  KeyIcon,
} from "lucide-react";
import * as React from "react";

import { NavLinks } from "@/components/navigation/nav-links";
import { NavUser } from "@/components/navigation/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { HomeLink } from "./home-link";

const allLinks = [
  {
    name: "Admin",
    url: "/admin",
    icon: Home,
    permission: "masterAdmin",
  },
  {
    name: "Access",
    url: "/admin/access",
    icon: KeyIcon,
    permission: "masterAdmin",
  },
  {
    name: "Projects",
    url: "/admin/projects",
    icon: List,
    permission: "projectManagement",
  },
  {
    name: "New Project",
    url: "/admin/new-project",
    icon: Hammer,
    permission: "projectManagement",
  },
  {
    name: "Applications",
    url: "/admin/applications",
    icon: FileUser,
    permission: "masterAdmin",
  },
  {
    name: "Publish",
    url: "/admin/new",
    icon: Plus,
    permission: "marketing",
  },
  {
    name: "Listings",
    url: "/admin/listings",
    icon: ChartBar,
    permission: "marketing",
  },
  {
    name: "About Info",
    url: "/admin/about",
    icon: LetterText,
    permission: "legal",
  },
  {
    name: "Landing Page",
    url: "/admin/update-landing-page",
    icon: LandPlot,
    permission: "marketing",
  },
  {
    name: "Contact Us",
    url: "/admin/contact-us",
    icon: Phone,
    permission: "communications",
  },
  {
    name: "Project Title Info",
    url: "/admin/projectTitle",
    icon: BookCheck,
    permission: "legal",
  },
  {
    name: "Team",
    url: "/admin/team-members",
    icon: User,
    permission: "communications",
  },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const {
    user,
    isMasterAdmin,
    isMarketing,
    isLegal,
    isComms,
    isProjectManagement,
  } = useSelector((store: IRootState) => store.user);

  const hasPermission = (permission: string): boolean => {
    if (isMasterAdmin) return true;
    return (
      (permission === "marketing" && isMarketing) ||
      (permission === "legal" && isLegal) ||
      (permission === "communications" && isComms) ||
      (permission === "projectManagement" && isProjectManagement)
    );
  };

  const filteredLinks = allLinks.filter((link) =>
    hasPermission(link.permission)
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HomeLink />
      </SidebarHeader>
      <SidebarContent>
        <NavLinks links={filteredLinks} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            avatar: "https://avatar.vercel.sh/thinklab.svg?text=TL",
            name: "Admin",
            email: user?.email ?? "admin@thinklab.com",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
