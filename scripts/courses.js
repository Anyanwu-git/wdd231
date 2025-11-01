// Base data: update "completed" to reflect your progress
const courses = [
    { code: "WDD130", title: "Web Fundamentals", credits: 2, tag: "WDD", completed: true },
    { code: "WDD131", title: "Dynamic Web Fundamentals", credits: 2, tag: "WDD", completed: true },
    { code: "CSE110", title: "Programming Building Blocks", credits: 2, tag: "CSE", completed: true },
    { code: "CSE111", title: "Programming with Functions", credits: 2, tag: "CSE", completed: false },
    { code: "WDD231", title: "Web Frontend Development I", credits: 3, tag: "WDD", completed: false },
    { code: "CSE210", title: "Programming with Classes", credits: 2, tag: "CSE", completed: false },
];

const grid = document.getElementById('courses');
const stats = document.getElementById('course-stats');
const filterBtns = document.querySelectorAll('.filter');

function render(list) {
    grid.innerHTML = '';

    // total credits shown (for currently displayed list)
    const total = list.reduce((sum, c) => sum + Number(c.credits || 0), 0);
    stats.textContent = `Showing ${list.length} course(s) · ${total} credit(s)`;

    list.forEach(c => {
        const card = document.createElement('article');
        card.className = 'course';
        card.innerHTML = `
      <h3>${c.code} — ${c.title}</h3>
      <div class="meta">Credits: ${c.credits} · Area: ${c.tag}</div>
      <div class="meta">
        <span class="badge ${c.completed ? 'done' : ''}">
          ${c.completed ? 'Completed' : 'In Progress'}
        </span>
      </div>
    `;
        grid.appendChild(card);
    });
}

function applyFilter(kind) {
    let list = courses;
    if (kind === 'WDD' || kind === 'CSE') {
        list = courses.filter(c => c.tag === kind);
    }
    render(list);
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFilter(btn.dataset.filter);
    });
});

// initial render
applyFilter('all');
