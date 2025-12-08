// scripts/home.js
import {
    initMobileNav,
    initYear,
    showModal,
    hideModal,
    initDismissHandlers
} from "./site.js";

document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initYear();
    loadFeaturedServices();
});

async function loadFeaturedServices() {
    const container = document.querySelector("#featured-services");
    const modal = document.querySelector("#service-modal");

    if (!container || !modal) return;

    initDismissHandlers(modal);

    try {
        const response = await fetch("data/services.json");
        if (!response.ok) {
            throw new Error("Failed to fetch services");
        }
        const services = await response.json();

        // pick first 3 as featured
        const featured = services.slice(0, 3);

        container.innerHTML = featured
            .map(
                (service) => `
        <article class="card">
          <img src="${service.image}" alt="${service.name}" loading="lazy">
          <h3>${service.name}</h3>
          <p>${service.description}</p>
          <p class="card-meta">
            <span>${service.duration}</span>
            <span>${service.price}</span>
          </p>
          <div class="card-actions">
            <button type="button" class="btn" data-service-id="${service.id}">
              View details
            </button>
          </div>
        </article>
      `
            )
            .join("");

        container.addEventListener("click", (event) => {
            const target = event.target;
            if (
                target instanceof HTMLElement &&
                target.dataset.serviceId
            ) {
                const id = Number(target.dataset.serviceId);
                const selected = services.find((s) => s.id === id);
                if (selected) {
                    openServiceModal(selected, modal);
                }
            }
        });
    } catch (error) {
        console.error(error);
        container.textContent =
            "We couldn't load services right now. Please refresh the page.";
    }
}

function openServiceModal(service, modal) {
    const titleEl = modal.querySelector("#service-modal-title");
    const imgEl = modal.querySelector("#service-modal-image");
    const descEl = modal.querySelector("#service-modal-description");
    const durationEl = modal.querySelector("#service-modal-duration");
    const priceEl = modal.querySelector("#service-modal-price");

    if (!titleEl || !imgEl || !descEl || !durationEl || !priceEl) return;

    titleEl.textContent = service.name;
    imgEl.src = service.image;
    imgEl.alt = service.name;
    descEl.textContent = service.description;
    durationEl.textContent = service.duration;
    priceEl.textContent = service.price;

    showModal(modal);
}
