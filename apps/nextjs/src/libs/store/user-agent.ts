import { create } from "zustand";

export interface UserAgentState {
  isMobileApp?: boolean;
  isWebview?: boolean;
  appVersion?: string;
}

export const useUserAgentStore = create<UserAgentState>()(() => ({
  isMobileApp: undefined,
  isWebview: undefined,
  appVersion: undefined,
}));
