import { useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { darkTheme } from "./theme";

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
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor}
}
ol, ul {
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
}
`;

const App = () => {
  useEffect(() => {
    fetch("/api/connect")
      .then((res) => res.json())
      .then((data) => alert(data.message));
    // api 호출 잘 되는 지 테스트해보기 위해 넣은겁니당..
    // server 와 proxy 서버를 통해 ajax 통신 잘 되는지 먼저 확인해주세요
    // mongodb 설치 후
    // .env 파일 만든 다음 DB_URL 작성해주셔야 합니다.
    // DB_URL=mongodb://127.0.0.1:27017/tundermarket 이런 형태입니다.
  }, []);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <HelmetProvider>
          <Helmet>
            <title>Thunder Market App</title>
          </Helmet>
        </HelmetProvider>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </>
  );
};

export default App;
