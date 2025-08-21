export const ROUTES = {
  HOME: "/",
  STORE_INFO: "/store-info/:storeId",
  MY_INFO: "/my-info",
  SHARELIST: "/sharelist",
  SHAREDETAIL: "/sharelist/:id",
  LOGIN: "/login",
  REGISTER_STORE: "/register/store",
  REGISTER_RECEIVE: "/register/receive",
  REGISTER_GIVE: "/register/give",
  AI_RECOMMEND: "/ai-recommend",
  MANAGE_RECEIVE: "/manage/receive",
  MANAGE_GIVE: "/manage/give",
  HISTORY_RECEIVE: "/history/receive",
  HISTORY_GIVE: "/history/give",
  HISTORY_DETAIL: "/history/detail/:id",
  SUCCESS: "/success/:id",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
