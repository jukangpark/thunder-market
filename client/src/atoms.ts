import { atom } from "recoil";

export const isDarkState = atom({
  key: "isDark",
  default: false,
});

export const isLoggedInState = atom({
  key: "isLoggedIn",
  default: false,
});