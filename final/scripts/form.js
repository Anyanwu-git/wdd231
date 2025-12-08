// scripts/form.js
import { initMobileNav, initYear } from "./site.js";

document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initYear();
    populateServiceOptions();
});

async function populateServiceOptions() {
    const select = document.querySelector("#service");
    if (!select) return;

    try {
        const response = await fetch("data/services.json");
        if (!response.ok) throw new Error("Unable to load services");
        const services = await response.json();

        select.innerHTML =
            '<option value="">Select a service…</option>' +
            services
                .map(
                    (s) =>
                        `<option value="${s.name}">${s.name} (${s.price}, ${s.duration})</option>`
                )
                .join("");
    } catch (error) {
        console.error(error);
        select.innerHTML =
            '<option value="">Services unavailable. Describe your style in the notes.</option>';
    }
}
