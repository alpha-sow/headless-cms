import type { Component } from "vue";

export type SidebarData = {
  name: string;
  navMain: {
    title: string;
    urlName: string;
    icon: Component;
  }[];
};
