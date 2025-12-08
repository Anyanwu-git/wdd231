// scripts/services.js
import {
    initMobileNav,
    initYear,
    showModal,
    initDismissHandlers,
    loadJSON,
    saveJSON
} from "./site.js";

const FAV_KEY = "ollys-favourite-services";

document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initYear();
    setupServices();
});

async function setupServices() {
    const list = document.querySelector("#services-list");
    const lengthFilter = document.querySelector("#length-filter");
    const modal = document.querySelector("#service-modal");

    if (!list || !lengthFilter || !modal) return;

    initDismissHandlers(modal);

    let services = [];
    let favourites = loadJSON(FAV_KEY, []);

    try {
        const response = await fetch("data/services.json");
        if (!response.ok) {
            throw new Error("Unable to fetch services");
        }
        services = await response.json();
    } catch (error) {
        console.error(error);
        list.textContent = "Unable to load services. Please try again later.";
        return;
    }

    function render() {
        const selectedLength = lengthFilter.value;
        const filtered =
            selectedLength === "all"
                ? services
                : services.filter((s) => s.length === selectedLength);

        list.innerHTML = "";

        filtered.forEach((service) => {
            const isFav = favourites.includes(service.id);
            const card = document.createElement("article");
            card.className = "card";
            card.innerHTML = `
        <img src="${service.image}" alt="${service.name}" loading="lazy">
        <h3>${service.name}</h3>
        <p>${service.description}</p>
        <p class="card-meta">
          <span>${service.duration}</span>
          <span>${service.price}</span>
        </p>
        <div class="card-actions">
          <button type="button" class="btn" data-id="${service.id}">
            View details
          </button>
          <button type="button" class="fav-btn ${isFav ? "is-favourite" : ""
                }" aria-pressed="${isFav}" data-fav-id="${service.id}">
            ${isFav ? "♥" : "♡"}
          </button>
        </div>
      `;
            list.appendChild(card);
        });
    }

    render();

    lengthFilter.addEventListener("change", render);

    list.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;

        if (target.dataset.id) {
            const id = Number(target.dataset.id);
            const service = services.find((s) => s.id === id);
            if (service) {
                openServiceModal(service, modal);
            }
        }

        if (target.dataset.favId) {
            const id = Number(target.dataset.favId);
            if (favourites.includes(id)) {
                favourites = favourites.filter((favId) => favId !== id);
            } else {
                favourites.push(id);
            }
            saveJSON(FAV_KEY, favourites);
            render();
        }
    });
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
