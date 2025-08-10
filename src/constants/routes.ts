export const ROUTES = {
  HOME: "/",
  STORE_INFO: "/store-info/:storeId",
  MY_INFO: "/my-info",
  SHARELIST: "/sharelist",
  SHAREDETAIL: "/sharelist/:id",
  LOGIN: "/login",
  REGISTER_RECEIVE: "/register/receive",
  REGISTER_GIVE: "/register/give",
  AI_RECOMMEND: "/ai-recommend",
  MANAGE: "/manage",
  HISTORY: "/history",
  SUCCESS: "/success",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
