export interface RouteConfig {
  handler: string;
  middleware?: string[];
}

export interface RouteGroup {
  [route: string]: RouteConfig;
}

export interface Routes {
  [prefix: string]: RouteGroup;
}

export type MiddlewareFunction = string;
export type HandlerFunction = string;

export interface Routes {
  jobs: RouteGroup;
}
