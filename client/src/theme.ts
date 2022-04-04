import { DefaultTheme } from "styled-components";

const size = {
  mobile: 767,
  tablet: 1023,
};

export const darkTheme: DefaultTheme = {
  bgColor: "#fff",
  textColor: "rgb(33, 33, 33)",
  accentColor: "whitesmoke",
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(min-width: ${size.mobile + 1}px) and (max-width: ${size.tablet}px)`,
  desktop: `(min-width: ${size.tablet + 1}px)`,
};

export const lightTheme: DefaultTheme = {
  bgColor: "fff",
  textColor: "#222222",
  accentColor: "whitesmoke",
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(min-width: ${size.mobile + 1}px) and (max-width: ${size.tablet}px)`,
  desktop: `(min-width: ${size.tablet + 1}px)`,
};
