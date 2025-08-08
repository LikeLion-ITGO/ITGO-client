import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

import Home from "./pages/home";
import { StoreInfoPage } from "./pages/StoreInfoPage";
import { MyInfoPage } from "./pages/MyInfoPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.STORE_INFO} element={<StoreInfoPage />} />
        <Route path={ROUTES.MY_INFO} element={<MyInfoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
