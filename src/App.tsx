import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

import Home from "./pages/home";
import { StoreInfoPage } from "./pages/StoreInfoPage";
import { MyInfoPage } from "./pages/MyInfoPage";
import { ShareListPage } from "./pages/ShareListPage";
import { ShareDetailPage } from "./pages/ShareDetailPage";
import { Login } from "./pages/Login";
import { RegisterGive } from "./pages/register-give";
import { RegisterReceive } from "./pages/register-receive";
import { AIRecommend } from "./pages/ai-recommend";
import Manage from "./pages/manage";
import History from "./pages/history";
import { Success } from "./pages/success";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HistoryDetail } from "./pages/history-detail";
import { Toaster } from "./components/ui/sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.STORE_INFO} element={<StoreInfoPage />} />
          <Route path={ROUTES.MY_INFO} element={<MyInfoPage />} />
          <Route path={ROUTES.SHARELIST} element={<ShareListPage />} />
          <Route path={ROUTES.SHAREDETAIL} element={<ShareDetailPage />} />
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.REGISTER_GIVE} element={<RegisterGive />} />
          <Route path={ROUTES.REGISTER_RECEIVE} element={<RegisterReceive />} />
          <Route path={ROUTES.AI_RECOMMEND} element={<AIRecommend />} />
          <Route
            path={ROUTES.MANAGE_RECEIVE}
            element={<Manage status={"receive"} />}
          />
          <Route
            path={ROUTES.MANAGE_GIVE}
            element={<Manage status={"give"} />}
          />
          <Route path={ROUTES.HISTORY} element={<History />} />
          <Route path={ROUTES.HISTORY_DETAIL} element={<HistoryDetail />} />
          <Route path={ROUTES.SUCCESS} element={<Success />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
