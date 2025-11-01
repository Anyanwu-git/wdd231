// copyright year
const year = new Date().getFullYear();
document.getElementById('copyright').textContent =
    `© ${year} · Lilian Anyanwu · United Kingdom`;

// last modified
document.getElementById('lastModified').textContent =
    `Last modified: ${document.lastModified}`;
