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
          <Route path="/" element={<Orders />} />
          <Route path="/group" element={<Group />} />
          {/* <Route path="*" element={<NoMatch />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
