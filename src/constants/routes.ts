export const ROUTES = {
  HOME: "/",
  MANAGE: "/manage",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
