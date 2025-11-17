// scripts/join.js

// Timestamp hidden field
function setTimestamp() {
    const timestampField = document.querySelector("#timestamp");
    if (!timestampField) return;

    const now = new Date();
    // ISO string is easy to parse on thankyou page
    timestampField.value = now.toISOString();
}

// Animate membership cards on load
function animateMembershipCards() {
    const cards = document.querySelectorAll(".membership-card");
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("animate-in");
        }, index * 120); // slight stagger
    });
}

// Simple modal open/close
function initModals() {
    const modalLinks = document.querySelectorAll("[data-modal-target]");
    const closeButtons = document.querySelectorAll("[data-close-modal]");

    modalLinks.forEach(link => {
        link.addEventListener("click", event => {
            event.preventDefault();
            const id = link.getAttribute("data-modal-target");
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.add("open");
                modal.setAttribute("aria-hidden", "false");
            }
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener("click", () => {
            const modal = button.closest(".modal");
            if (modal) {
                modal.classList.remove("open");
                modal.setAttribute("aria-hidden", "true");
            }
        });
    });

    // Close modal on backdrop click
    document.addEventListener("click", event => {
        const modal = event.target.closest(".modal");
        if (!modal) return;

        if (event.target === modal) {
            modal.classList.remove("open");
            modal.setAttribute("aria-hidden", "true");
        }
    });

    // Escape key closes any open modal
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            document.querySelectorAll(".modal.open").forEach(modal => {
                modal.classList.remove("open");
                modal.setAttribute("aria-hidden", "true");
            });
        }
    });
}

// Footer info
function initFooter() {
    const yearSpan = document.querySelector("#year");
    const lastModifiedSpan = document.querySelector("#last-modified");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;
}

// Simple nav toggle (if you want mobile menu working here too)
function initNavToggle() {
    const toggle = document.querySelector("#menu-toggle");
    const nav = document.querySelector("#primary-nav");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setTimestamp();
    animateMembershipCards();
    initModals();
    initFooter();
    initNavToggle();
});
