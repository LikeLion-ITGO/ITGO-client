import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

import Home from "./pages/home";
import Manage from "./pages/manage";
import History from "./pages/history";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.MANAGE} element={<Manage />} />
        <Route path={ROUTES.HISTORY} element={<History />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
