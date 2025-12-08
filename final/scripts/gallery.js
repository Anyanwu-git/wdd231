// scripts/gallery.js
import {
    initMobileNav,
    initYear,
    showModal,
    initDismissHandlers
} from "./site.js";

document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initYear();
    loadGallery();
});

async function loadGallery() {
    const grid = document.querySelector("#gallery-grid");
    const modal = document.querySelector("#gallery-modal");

    if (!grid || !modal) return;

    initDismissHandlers(modal);

    try {
        const response = await fetch("data/gallery.json");
        if (!response.ok) throw new Error("Failed to fetch gallery");
        const items = await response.json();

        grid.innerHTML = items
            .map(
                (item) => `
        <button type="button" class="gallery-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" loading="lazy">
          <span>${item.title}</span>
        </button>
      `
            )
            .join("");

        grid.addEventListener("click", (event) => {
            const target = event.target;
            if (!(target instanceof HTMLElement)) return;

            const button = target.closest(".gallery-item");
            if (!button) return;

            const id = Number(button.dataset.id);
            const selected = items.find((g) => g.id === id);
            if (selected) {
                openGalleryModal(selected, modal);
            }
        });
    } catch (error) {
        console.error(error);
        grid.textContent = "Gallery is unavailable at the moment.";
    }
}

function openGalleryModal(item, modal) {
    const titleEl = modal.querySelector("#gallery-modal-title");
    const imgEl = modal.querySelector("#gallery-modal-image");
    const descEl = modal.querySelector("#gallery-modal-description");

    if (!titleEl || !imgEl || !descEl) return;

    titleEl.textContent = item.title;
    imgEl.src = item.image;
    imgEl.alt = item.title;
    descEl.textContent = item.description;

    showModal(modal);
}
