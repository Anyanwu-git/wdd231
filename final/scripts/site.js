// scripts/site.js

export function initYear() {
    const yearSpan = document.querySelector("#year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

export function initMobileNav() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const navList = document.querySelector(".site-nav ul");

    if (!header || !toggle || !navList) return;

    toggle.addEventListener("click", () => {
        const isOpen = header.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });
}

/**
 * Generic modal setup. Pass the modal element and optional onOpen hook.
 */
export function showModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add("is-visible");
    modalEl.setAttribute("aria-hidden", "false");
}

export function hideModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove("is-visible");
    modalEl.setAttribute("aria-hidden", "true");
}

export function initDismissHandlers(modalEl) {
    if (!modalEl) return;
    modalEl.addEventListener("click", (event) => {
        const target = event.target;
        if (
            target instanceof HTMLElement &&
            (target.dataset.modalDismiss !== undefined ||
                target.classList.contains("modal"))
        ) {
            hideModal(modalEl);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modalEl.classList.contains("is-visible")) {
            hideModal(modalEl);
        }
    });
}

/**
 * Local storage helpers
 */
export function loadJSON(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        if (!raw) return fallback;
        return JSON.parse(raw);
    } catch {
        return fallback;
    }
}

export function saveJSON(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch {
        // ignore, storage may be full or unavailable
    }
}
