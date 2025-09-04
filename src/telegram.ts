type TGWebApp = {
  ready: () => void;
  expand: () => void;
  themeParams?: Record<string, string>;
  onEvent: (event: string, cb: () => void) => void;
  offEvent?: (event: string, cb: () => void) => void;
  BackButton: { show: () => void; hide: () => void; onClick: (cb: () => void) => void };
  MainButton: {
    setText: (t: string) => void;
    show: () => void;
    hide: () => void;
    onClick: (cb: () => void) => void;
  };
  initDataUnsafe?: { start_param?: string | null };
};

declare global {
  interface Window {
    Telegram?: { WebApp: TGWebApp };
  }
}

export const tg = {
  get webapp(): TGWebApp | null {
    return window.Telegram?.WebApp ?? null;
  },
  init() {
    const w = this.webapp;
    if (!w) return;
    try {
      w.ready();
      w.expand();
    } catch {}
  },
  theme(): Record<string, string> {
    return this.webapp?.themeParams ?? {};
  },
  onThemeChanged(cb: () => void) {
    this.webapp?.onEvent('themeChanged', cb);
  },
  startParam(): string | null {
    return this.webapp?.initDataUnsafe?.start_param ?? null;
  }
};

export function applyThemeToDocument(params: Record<string, string>) {
  const root = document.documentElement;
  for (const [k, v] of Object.entries(params)) {
    root.style.setProperty(`--tg-${k}`, v);
  }
}

