export const ROUTES = {
  HOME: "/",
  STORE_INFO: "/store-info/:storeId",
  MY_INFO: "/my-info",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
