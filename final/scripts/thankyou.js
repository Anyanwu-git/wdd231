// scripts/thankyou.js
import { initMobileNav, initYear } from "./site.js";

document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initYear();
    displaySummary();
});

function displaySummary() {
    const container = document.querySelector("#booking-summary");
    if (!container) return;

    const params = new URLSearchParams(window.location.search);

    const name = params.get("name") || "Guest";
    const email = params.get("email") || "Not provided";
    const phone = params.get("phone") || "Not provided";
    const service = params.get("service") || "Any suitable style";
    const date = params.get("date") || "To be arranged";
    const time = params.get("time") || "Flexible";
    const notes = params.get("notes") || "No additional information.";

    container.innerHTML = `
    <h2>Booking Summary</h2>
    <dl>
      <dt>Name</dt><dd>${name}</dd>
      <dt>Email</dt><dd>${email}</dd>
      <dt>Phone</dt><dd>${phone}</dd>
      <dt>Requested Service</dt><dd>${service}</dd>
      <dt>Preferred Date</dt><dd>${date}</dd>
      <dt>Preferred Time</dt><dd>${time}</dd>
      <dt>Notes</dt><dd>${notes}</dd>
    </dl>
  `;
}
