"use client";

import { Home, Plus, ChartBar, FileUser } from "lucide-react";
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

const links = [
  {
    name: "Admin",
    url: "/admin",
    icon: Home,
  },
  {
    name: "Applications",
    url: "/admin/applications",
    icon: FileUser,
  },
  {
    name: "Publish",
    url: "/admin/new",
    icon: Plus,
  },
  {
    name: "Listings",
    url: "/admin/listings",
    icon: ChartBar,
  },
  // {
  //   name: "Appoinments",
  //   url: "/admin/apointment",
  //   icon: Mail,
  // },
  // {
  //   name: "Agents",
  //   url: "/admin/agents",
  //   icon: Home,
  // },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { user } = useSelector((store: IRootState) => store.user);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HomeLink />
      </SidebarHeader>
      <SidebarContent>
        <NavLinks links={links} />
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
