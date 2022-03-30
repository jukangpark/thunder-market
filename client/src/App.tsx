import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    fetch("/api/connect").then((res) => res.json()).then((data) => alert(data.message));
  }, []);

  return <div>thunder market</div>
}

export default App;