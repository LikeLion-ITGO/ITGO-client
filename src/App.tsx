import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes";

import Home from "./pages/home";
import { RegisterGive } from "./pages/register-give";
import { RegisterReceive } from "./pages/register-receive";
import { AIRecommend } from "./pages/ai-recommend";
import Manage from "./pages/manage";
import History from "./pages/history";
import { Success } from "./pages/success";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.REGISTER_GIVE} element={<RegisterGive />} />
          <Route path={ROUTES.REGISTER_RECEIVE} element={<RegisterReceive />} />
          <Route path={ROUTES.AI_RECOMMEND} element={<AIRecommend />} />
          <Route path={ROUTES.MANAGE} element={<Manage />} />
          <Route path={ROUTES.HISTORY} element={<History />} />
          <Route path={ROUTES.SUCCESS} element={<Success />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
