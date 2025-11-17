// scripts/thankyou.js

function getParam(params, name) {
    const value = params.get(name);
    return value && value.trim() !== "" ? value : "Not provided";
}

function formatMembershipLevel(value) {
    switch (value) {
        case "np": return "NP Membership (Non-Profit)";
        case "bronze": return "Bronze Membership";
        case "silver": return "Silver Membership";
        case "gold": return "Gold Membership";
        default: return "Not specified";
    }
}

function formatTimestamp(value) {
    if (!value) return "Not provided";
    const date = new Date(value);
    if (isNaN(date.getTime())) return value;
    return date.toLocaleString("en-GB", {
        dateStyle: "medium",
        timeStyle: "short"
    });
}

function populateSummary() {
    const params = new URLSearchParams(window.location.search);

    document.querySelector("#summary-firstName").textContent =
        getParam(params, "firstName");

    document.querySelector("#summary-lastName").textContent =
        getParam(params, "lastName");

    document.querySelector("#summary-email").textContent =
        getParam(params, "email");

    document.querySelector("#summary-phone").textContent =
        getParam(params, "phone");

    document.querySelector("#summary-orgName").textContent =
        getParam(params, "orgName");

    document.querySelector("#summary-membershipLevel").textContent =
        formatMembershipLevel(params.get("membershipLevel"));

    document.querySelector("#summary-timestamp").textContent =
        formatTimestamp(params.get("timestamp"));
}

function initFooter() {
    const yearSpan = document.querySelector("#year");
    const lastModifiedSpan = document.querySelector("#last-modified");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;
}

function initNavToggle() {
    const toggle = document.querySelector("#menu-toggle");
    const nav = document.querySelector("#primary-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        nav.classList.toggle("open");
    });
}

document.addEventListener("DOMContentLoaded", () => {
    populateSummary();
    initFooter();
    initNavToggle();
});
