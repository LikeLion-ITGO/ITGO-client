export const ROUTES = {
  HOME: "/",
  REGISTER_RECEIVE: "/register/receive",
  REGISTER_GIVE: "/register/give",
  AI_RECOMMEND: "/ai-recommend",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
