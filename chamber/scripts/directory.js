const nav = document.querySelector('#primary-nav');
const menuBtn = document.querySelector('#menu');
menuBtn?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
});

// dynamic footer dates
document.getElementById('copyright').textContent =
    `© ${new Date().getFullYear()} · [Your City] Chamber · WDD 231`;
document.getElementById('lastModified').textContent =
    `Last modified: ${document.lastModified}`;

// grid/list toggle
const dir = document.getElementById('directory');
const gridBtn = document.getElementById('gridBtn');
const listBtn = document.getElementById('listBtn');

function setView(view) {
    if (view === 'grid') {
        dir.classList.add('grid'); dir.classList.remove('list');
        gridBtn.classList.add('active'); listBtn.classList.remove('active');
        gridBtn.setAttribute('aria-pressed', 'true'); listBtn.setAttribute('aria-pressed', 'false');
    } else {
        dir.classList.add('list'); dir.classList.remove('grid');
        listBtn.classList.add('active'); gridBtn.classList.remove('active');
        listBtn.setAttribute('aria-pressed', 'true'); gridBtn.setAttribute('aria-pressed', 'false');
    }
}
gridBtn.addEventListener('click', () => setView('grid'));
listBtn.addEventListener('click', () => setView('list'));

// render helpers
function memberCard(m) {
    const levelName = m.membership === 3 ? 'Gold' : m.membership === 2 ? 'Silver' : 'Member';
    const levelClass = m.membership === 3 ? 'gold' : m.membership === 2 ? 'silver' : '';
    return `
    <article class="card">
      <img src="images/${m.image}" alt="${m.name} logo" loading="lazy" width="72" height="72">
      <div>
        <h3>${m.name} <span class="badge ${levelClass}">${levelName}</span></h3>
        <p class="meta">${m.address} · <a href="tel:${m.phone.replace(/\s+/g, '')}">${m.phone}</a></p>
        <p class="meta"><a href="${m.website}" target="_blank" rel="noopener">${m.website.replace(/^https?:\/\//, '')}</a></p>
      </div>
    </article>
  `;
}

async function loadMembers() {
    try {
        const res = await fetch('data/members.json');
        const data = await res.json(); // array
        dir.innerHTML = data.map(memberCard).join('');
    } catch (err) {
        dir.innerHTML = `<p>Could not load members.</p>`;
        console.error(err);
    }
}
loadMembers();
