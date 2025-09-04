type RouteHandler = (params: Record<string, string>) => void;

interface RouteDef {
  pattern: RegExp;
  keys: string[];
  handler: RouteHandler;
}

export class Router {
  private routes: RouteDef[] = [];
  private notFound: (() => void) | null = null;

  constructor() {
    window.addEventListener('hashchange', () => this.resolve());
  }

  add(path: string, handler: RouteHandler) {
    const { pattern, keys } = this.compile(path);
    this.routes.push({ pattern, keys, handler });
  }

  setNotFound(handler: () => void) {
    this.notFound = handler;
  }

  start() {
    this.resolve();
  }

  navigate(hash: string) {
    if (location.hash === hash) this.resolve();
    else location.hash = hash;
  }

  private resolve() {
    const hash = location.hash || '#/';
    for (const r of this.routes) {
      const m = r.pattern.exec(hash);
      if (m) {
        const params: Record<string, string> = {};
        r.keys.forEach((k, i) => (params[k] = m[i + 1]));
        r.handler(params);
        return;
      }
    }
    this.notFound?.();
  }

  private compile(path: string) {
    const keys: string[] = [];
    const pattern = path
      .replace(/\//g, '\\/')
      .replace(/:([A-Za-z0-9_]+)/g, (_, k) => {
        keys.push(k);
        return '([A-Za-z0-9-]+)';
      });
    return { pattern: new RegExp(`^#${pattern}$`), keys };
  }
}

