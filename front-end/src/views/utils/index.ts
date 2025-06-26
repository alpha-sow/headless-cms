import type { Component } from "vue";

export type SidebarData = {
  versions?: string[];
  name: string;
  navMain: {
    title: string;
    urlName: string;
    icon: Component;
  }[];
};
