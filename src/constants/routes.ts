export const ROUTES = {
  HOME: "/",
  STORE_INFO: "/store-info/:storeId",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
