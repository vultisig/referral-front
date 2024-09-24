export function initTg() {
    if (window.Telegram?.WebApp) {
        window.Telegram?.WebApp.expand();
        window.Telegram?.WebApp.disableVerticalSwipes();
        window.Telegram?.WebApp.setHeaderColor('#02122b');
        window.Telegram?.WebApp.setBackgroundColor('#02122b');
        window.Telegram?.WebApp.MainButton?.hide();
        window.Telegram?.WebApp.ready();
    }
}
