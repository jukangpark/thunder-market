import Header from "../components/Header";
import { Wrapper } from "../components/fundamental";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Home = () => {
  return (
    <Wrapper>
      <HelmetProvider>
        <Helmet>
          <title>Thunder Market | Home</title>
        </Helmet>
      </HelmetProvider>
      <Header />
      Home
    </Wrapper>
  );
};

export default Home;
