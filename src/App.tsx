import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

import Home from "./pages/home";
import { ShareListPage } from "./pages/ShareListPage";
import { ShareDetailPage } from "./pages/ShareDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SHARELIST} element={<ShareListPage />} />
        <Route path={ROUTES.SHAREDETAIL} element={<ShareDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
