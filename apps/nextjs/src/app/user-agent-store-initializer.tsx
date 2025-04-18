"use client";

import { useRef } from "react";
import type { UserAgentState } from "@/libs/store/user-agent";
import { useUserAgentStore } from "@/libs/store/user-agent";

function UserAgentStoreInitializer({
  isMobileApp,
  isWebview,
  appVersion,
}: UserAgentState) {
  const initialized = useRef(false);
  if (!initialized.current) {
    if (isMobileApp) {
      useUserAgentStore.setState({ isMobileApp, isWebview, appVersion });
    }
    initialized.current = true;
  }
  return null;
}

export default UserAgentStoreInitializer;
