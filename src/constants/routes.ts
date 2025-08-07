export const ROUTES = {
  HOME: "/",
  SHARELIST: "/sharelist",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
