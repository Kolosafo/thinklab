import {
  LayoutPanelTop,
  SettingsIcon,
  BookCheckIcon,
  HouseIcon,
  PinIcon,
} from "lucide-react";

export const items = [
  {
    name: "Dashboard",
    url: "/",
    icon: LayoutPanelTop,
  },
  {
    name: "Appointments",
    url: "/appointments",
    icon: BookCheckIcon,
  },
  {
    name: "Properties",
    url: "/properties",
    icon: HouseIcon,
  },
  {
    name: "Location",
    url: "/location",
    icon: PinIcon,
  },

  {
    name: "Settings",
    url: "/settings",
    icon: SettingsIcon,
  },
];
