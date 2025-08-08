import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

import Home from "./pages/home";
import { StoreInfoPage } from "./pages/StoreInfoPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.STORE_INFO} element={<StoreInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
