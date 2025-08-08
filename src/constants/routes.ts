export const ROUTES = {
  HOME: "/",
  MANAGE: "/manage",
  SUCCESS: "/success",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
