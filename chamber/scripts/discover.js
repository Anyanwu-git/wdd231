// chamber/scripts/discover.js
import { places } from "../data/discover.mjs";

// ---------- Build cards from JSON data ----------
function renderPlaces() {
    const grid = document.querySelector("#discover-grid");
    if (!grid) return;

    places.forEach((place, index) => {
        const card = document.createElement("article");
        card.classList.add("discover-card", `card${index + 1}`);

        card.innerHTML = `
      <h2>${place.name}</h2>
      <figure>
        <img src="${place.image}" alt="${place.alt}" loading="lazy">
        <figcaption>${place.name}</figcaption>
      </figure>
      <address>${place.address}</address>
      <p class="description">${place.description}</p>
      <button type="button" class="learn-more">Learn more</button>
    `;

        grid.appendChild(card);
    });
}

// ---------- Last-visit message using localStorage ----------
function showVisitMessage() {
    const messageElement = document.querySelector("#visit-message");
    if (!messageElement) return;

    const now = Date.now();
    const lastVisit = Number(localStorage.getItem("discover-last-visit"));

    let messageText = "";

    if (!lastVisit) {
        messageText = "Welcome! Let us know if you have any questions.";
    } else {
        const msDifference = now - lastVisit;
        const daysDifference = Math.floor(
            msDifference / (1000 * 60 * 60 * 24)
        );

        if (daysDifference < 1) {
            messageText = "Back so soon! Awesome!";
        } else if (daysDifference === 1) {
            messageText = "You last visited 1 day ago.";
        } else {
            messageText = `You last visited ${daysDifference} days ago.`;
        }
    }

    messageElement.textContent = messageText;
    localStorage.setItem("discover-last-visit", String(now));
}

// ---------- Initialize ----------
document.addEventListener("DOMContentLoaded", () => {
    renderPlaces();
    showVisitMessage();
});
