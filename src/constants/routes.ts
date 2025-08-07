export const ROUTES = {
  HOME: "/",
  SHARELIST: "/sharelist",
  SHAREDETAIL: "/sharelist/:id",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
