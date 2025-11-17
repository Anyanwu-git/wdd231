// scripts/chamber-home.js

// =============== WEATHER SECTION ===============

// Replace with your real OpenWeather API key
const apiKey = "4a2896832d2d9a3dd31df2ad386df1d9";
const lat = 51.5074; // London latitude
const lon = -0.1278; // London longitude

// 5-day forecast endpoint (3-hour steps)
const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function displayWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error("Weather fetch failed");
        const data = await response.json();

        // CURRENT WEATHER = first list item
        const current = data.list[0];
        const currentDiv = document.querySelector("#current-weather");
        const temp = Math.round(current.main.temp);
        const description = current.weather[0].description;
        const iconCode = current.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

        currentDiv.innerHTML = `
      <div class="current-weather-inner">
        <img src="${iconUrl}" alt="${description}">
        <div>
          <p class="temp">${temp}&deg;C</p>
          <p class="description">${description}</p>
        </div>
      </div>
    `;

        // 3-DAY FORECAST
        // pick roughly 1 entry per day (indices 8,16,24 ≈ 24h apart)
        const indices = [8, 16, 24];
        const forecastDiv = document.querySelector("#forecast");
        forecastDiv.innerHTML = "";

        indices.forEach(i => {
            const item = data.list[i];
            if (!item) return;

            const date = new Date(item.dt * 1000);
            const dayName = date.toLocaleDateString("en-GB", { weekday: "short" });
            const dayTemp = Math.round(item.main.temp);
            const dayDesc = item.weather[0].description;
            const dayIcon = item.weather[0].icon;
            const dayIconUrl = `https://openweathermap.org/img/w/${dayIcon}.png`;

            const card = document.createElement("article");
            card.classList.add("forecast-card");
            card.innerHTML = `
        <h3>${dayName}</h3>
        <img src="${dayIconUrl}" alt="${dayDesc}">
        <p>${dayTemp}&deg;C</p>
        <p>${dayDesc}</p>
      `;
            forecastDiv.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        const currentDiv = document.querySelector("#current-weather");
        currentDiv.textContent = "Unable to load weather data at this time.";
    }
}

// =============== COMPANY SPOTLIGHTS ===============

const membersUrl = "data/members.json"; // adjust if your path is different

async function displaySpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error("Members fetch failed");
        const data = await response.json();

        // Filter only gold and silver members
        const premiumMembers = data.members.filter(member =>
            ["Gold", "Silver"].includes(member.membershipLevel)
        );

        // Shuffle the array randomly
        premiumMembers.sort(() => Math.random() - 0.5);

        // Take 2 or 3 members (up to you; I’ll use 3)
        const selected = premiumMembers.slice(0, 3);

        const container = document.querySelector("#spotlight-container");
        container.innerHTML = "";

        selected.forEach(member => {
            const card = document.createElement("article");
            card.classList.add("card", "spotlight-card");
            card.innerHTML = `
        <img src="${member.image}" alt="${member.name} logo" loading="lazy">
        <h3>${member.name}</h3>
        <p>${member.membershipLevel} Member</p>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank" rel="noopener">
          Visit Website
        </a>
      `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        const container = document.querySelector("#spotlight-container");
        container.textContent = "Unable to load member spotlights.";
    }
}

// =============== FOOTER UTILITIES (OPTIONAL) ===============

function initFooter() {
    const yearSpan = document.querySelector("#year");
    const lastModifiedSpan = document.querySelector("#last-modified");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (lastModifiedSpan) lastModifiedSpan.textContent = document.lastModified;
}

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    displayWeather();
    displaySpotlights();
    initFooter();
});
