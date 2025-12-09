// scripts/discover.js
import { places } from "../data/discover.mjs";

const grid = document.querySelector("#discover-grid");
const visitMessage = document.querySelector("#visit-message");
const YEAR_SPAN = document.querySelector("#year");

// ---------- Visitor message using localStorage ----------
function updateVisitMessage() {
    if (!visitMessage) return;

    const STORAGE_KEY = "chamber-discover-last-visit";
    const now = Date.now();
    const last = Number(localStorage.getItem(STORAGE_KEY));

    let message;

    if (!last) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const msPerDay = 1000 * 60 * 60 * 24;
        const days = Math.floor((now - last) / msPerDay);

        if (days < 1) {
            message = "Back so soon! Awesome!";
        } else if (days === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${days} days ago.`;
        }
    }

    visitMessage.textContent = message;
    localStorage.setItem(STORAGE_KEY, String(now));
}

// ---------- Build 8 cards from JSON data ----------
function buildCards() {
    if (!grid) return;

    places.forEach((place, index) => {
        const card = document.createElement("article");
        card.className = `discover-card card${index + 1}`;

        card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="${place.image}"
             alt="${place.alt}"
             width="300"
             height="200"
             loading="lazy">
      </figure>
      <address>${place.address}</address>
      <p class="description">${place.description}</p>
      <button type="button" class="learn-more">Learn more</button>
    `;

        grid.appendChild(card);
    });
}

// ---------- Footer year ----------
function updateYear() {
    if (YEAR_SPAN) {
        YEAR_SPAN.textContent = new Date().getFullYear();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    buildCards();        // JSON → 8 cards
    updateVisitMessage(); // localStorage
    updateYear();
});
