export const BOT_USERNAME = 'your_bot_username';
export const DEEPLINK = (payload: string) =>
  `https://t.me/${BOT_USERNAME}?startapp=${encodeURIComponent(payload)}`;

export const APP_TITLE = 'Каталог QR';
