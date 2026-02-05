import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";

import RecruitmentBoard from "./pages/RecruitmentBoard";
import AddEmployee from "./pages/AddEmployee";
import EditEmployee from "./pages/EditEmployee";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wrapper */}
        <Route path="/" element={<Layout />}>
          <Route index element={<RecruitmentBoard />} />
          <Route path="candidates" element={<RecruitmentBoard />} />
          <Route path="candidates/add" element={<AddEmployee />} />
          <Route path="candidates/edit/:id" element={<EditEmployee />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;