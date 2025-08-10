import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

import Home from "./pages/home";

import { StoreInfoPage } from "./pages/StoreInfoPage";
import { MyInfoPage } from "./pages/MyInfoPage";
import { ShareListPage } from "./pages/ShareListPage";
import { ShareDetailPage } from "./pages/ShareDetailPage";
import { Login } from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />

        <Route path={ROUTES.STORE_INFO} element={<StoreInfoPage />} />
        <Route path={ROUTES.MY_INFO} element={<MyInfoPage />} />

        <Route path={ROUTES.SHARELIST} element={<ShareListPage />} />
        <Route path={ROUTES.SHAREDETAIL} element={<ShareDetailPage />} />
        
        <Route path={ROUTES.LOGIN} element={<Login />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
