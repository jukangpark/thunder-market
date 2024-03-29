import { Helmet, HelmetProvider } from "react-helmet-async";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkState } from "./atoms";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
  font-family: 'Noto Sans KR', sans-serif;
  letter-spacing: -0.5px;
  direction: ltr;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  min-width: 1236px;
}
ol, ul, li {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
  display: block;
  
}
thead, tr, th, tbody {
    display: block;
}

a{
  text-decoration: none;
  color: ${(props) => props.theme.textColor};
}
button {
  outline: none;
  border: 0;
  background-color: transparent;
  font-family: 'Noto Sans KR', sans-serif;
  padding: 0;
  color: ${(props) => props.theme.btnColor};
}
`;

const App = () => {
  const isDark = useRecoilValue(isDarkState);

  return (
    <ThemeProvider theme={isDark ? lightTheme : darkTheme}>
      <HelmetProvider>
        <Helmet>
          <title>Thunder Market</title>
        </Helmet>
      </HelmetProvider>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;
