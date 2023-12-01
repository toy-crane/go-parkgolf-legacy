export const PermittedDevicesAllowList: string[] = ["tel:*"];

export const serviceAllowList: string[] = [
  "https://www.goparkgolf.app",
  "http://192.168.45.222:3000",
];

export const originAllowList: string[] = [
  ...PermittedDevicesAllowList,
  ...serviceAllowList,
];
