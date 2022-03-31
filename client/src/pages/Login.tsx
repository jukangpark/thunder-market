import { Helmet, HelmetProvider } from "react-helmet-async";
import { Wrapper } from "../components/fundamental";
import Header from "../components/Header";

const Login = () => {
  return (
    <Wrapper>
      <HelmetProvider>
        <Helmet>
          <title>Thunder Market | login</title>
        </Helmet>
      </HelmetProvider>
      <Header />
    </Wrapper>
  );
};

export default Login;
