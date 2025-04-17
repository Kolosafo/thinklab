"use client";

import { Home, Mail, Plus } from "lucide-react";
import * as React from "react";

import { NavLinks } from "@/components/navigation/nav-links";
import { NavUser } from "@/components/navigation/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { HomeLink } from "./home-link";

const links = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: Home,
    requiresAuth: false,
  },
  {
    name: "New Listing",
    url: "/dashboard/new",
    icon: Plus,
    requiresAuth: true,
  },
  {
    name: "Requests",
    url: "/dashboard/requests",
    icon: Mail,
    requiresAuth: true,
  },
];

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://avatar.vercel.sh/thinklab.svg?text=TL",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <HomeLink />
      </SidebarHeader>
      <SidebarContent>
        <NavLinks links={links} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
