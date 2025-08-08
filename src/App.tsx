import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

import Home from "./pages/home";
import Manage from "./pages/manage";
import { Success } from "./pages/success";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.MANAGE} element={<Manage />} />
        <Route path={ROUTES.SUCCESS} element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
