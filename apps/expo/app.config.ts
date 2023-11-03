import type { ExpoConfig } from "@expo/config";

const defineConfig = (): ExpoConfig => ({
  name: "파크골프 가자",
  slug: "goparkgolf",
  scheme: "goparkgolf",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#27D51A",
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "app.goparkgolf.www",
    supportsTablet: true,
    infoPlist: {
      NSLocationAlwaysAndWhenInUseUsageDescription:
        "사용자의 위치를 기반으로 파크골프장 정보를 제공하기 위해 권한이 필요합니다.",
      NSLocationAlwaysUsageDescription:
        "사용자의 위치를 기반으로 파크골프장 정보를 제공하기 위해 권한이 필요합니다.",
      NSLocationUsageDescription:
        "사용자의 위치를 기반으로 파크골프장 정보를 제공하기 위해 권한이 필요합니다.",
      NSLocationWhenInUseUsageDescription:
        "사용자의 위치를 기반으로 파크골프장 정보를 제공하기 위해 권한이 필요합니다.",
      NSUserTrackingUsageDescription:
        "사용자에게 최적화된 광고를 제공하기 위해 사용자의 광고 활동 정보를 수집합니다",
    },
  },
  android: {
    package: "app.goparkgolf.www",
    versionCode: 1,
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#1F104A",
    },
  },
  extra: {
    eas: {
      projectId: "4546c602-3f3d-4555-b1dc-f400dd645683",
    },
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    "./expo-plugins/with-modify-gradle.js",
    [
      "expo-location",
      {
        locationAlwaysAndWhenInUsePermission:
          "$(PRODUCT_NAME)가 사용자의 위치 정보를 사용하는데, 동의하시겠습니까?",
      },
    ],
    [
      "expo-tracking-transparency",
      {
        userTrackingPermission:
          "사용자에게 최적화된 광고를 제공하기 위해 사용자의 광고 활동 정보를 수집합니다",
      },
    ],
  ],
});

export default defineConfig;
