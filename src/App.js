import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Orders from "./components/OrderTable/Orders";
import Layout from "./components/Layout/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          {/* <Route index element={<Home />} /> */}
          {/* <Route path="/" element={<>} /> */}
          <Route path="/" element={<Orders />} />
          {/* Using path="*"" means "match anything", so this route
    acts like a catch-all for URLs that we don't have explicit
    routes for. */}
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
