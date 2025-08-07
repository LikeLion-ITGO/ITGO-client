import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

import Home from "./pages/home";
import { ShareListPage } from "./pages/ShareListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.SHARELIST} element={<ShareListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
