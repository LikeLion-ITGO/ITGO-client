export const ROUTES = {
  HOME: "/",
  MANAGE: "/manage",
  HISTORY: "/history",
  SUCCESS: "/success",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
