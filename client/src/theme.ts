import { RecoilBridge } from "recoil";
import { DefaultTheme } from "styled-components";

const size = {
  mobile: 767,
  tablet: 1023,
};

export const darkTheme: DefaultTheme = {
  bgColor: "rgb(255, 255, 255)",
  textColor: "rgb(33, 33, 33)",
  btnColor: "rgb(102, 102, 102)",
  accentColor: "rgb(247, 47, 51)",
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(min-width: ${size.mobile + 1}px) and (max-width: ${size.tablet}px)`,
  desktop: `(min-width: ${size.tablet + 1}px)`,
};

export const lightTheme: DefaultTheme = {
  bgColor: "rgb(33, 33, 33)",
  textColor: "rgb(255, 255, 255)",
  btnColor: "rgb(168, 168, 168)",
  accentColor: "rgb(247, 0 ,0)",
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(min-width: ${size.mobile + 1}px) and (max-width: ${size.tablet}px)`,
  desktop: `(min-width: ${size.tablet + 1}px)`,
};
