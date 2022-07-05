import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Orders from "./components/Order/Orders";
import Layout from "./components/Layout/Layout";
import Group from "./components/Group/Groups";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          {/* <Route index element={<Home />} /> */}
          {/* <Route path="/" element={<>} /> */}
          <Route path="/order" element={<Orders />} />
          <Route path="/group" element={<Group />} />
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
