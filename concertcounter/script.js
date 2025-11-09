async function loadConcerts() {
  try {
    const response = await fetch('concerts.json');
    if (!response.ok) throw new Error('concerts.json niet gevonden');
    const concerts = await response.json();
    renderConcerts(concerts);
  } catch (err) {
    console.error('Fout bij laden concerten:', err);
    document.getElementById("upcoming-list").innerHTML =
      "<p style='color:red;'>Concertgegevens konden niet worden geladen.</p>";
  }
}

function createConcertCard(concert, isPast) {
  const card = document.createElement("div");
  card.classList.add("concert-card");
  card.dataset.datetime = concert.datetime;

  card.innerHTML = `
    <div class="info">
      <div>
        <div class="details">
          <h3>${concert.artist}</h3>
          <p>${concert.location}</p>
        </div>
        <div class="date">${formatDate(concert.datetime)}</div>
      </div>
      <div class="countdown"></div>
    </div>
  `;

  // Fade-in animatie
  setTimeout(() => card.classList.add("show"), 50);
  return card;
}

function formatDate(datetime) {
  const date = new Date(datetime);
  const options = { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" };
  return date.toLocaleDateString("nl-NL", options).replace(" om", " –");
}

function updateCountdowns() {
  const now = new Date();
  document.querySelectorAll(".concert-card").forEach(card => {
    const target = new Date(card.dataset.datetime);
    const countdownEl = card.querySelector(".countdown");

    if (isSameDay(target, now)) {
      countdownEl.textContent = "Vandaag ⚡🎸";
      countdownEl.style.color = "#16a34a";
      return;
    }

    const diff = target - now;

    if (diff <= 0) {
      const daysAgo = Math.floor((now - target) / (1000 * 60 * 60 * 24));
      countdownEl.textContent = `${daysAgo} dagen geleden 🎶`;
      countdownEl.classList.add("finished");
    } else {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      countdownEl.textContent = `${days}d ${hours}u ${minutes}m`;
      countdownEl.style.color = interpolateColor(days);
      countdownEl.classList.remove("finished");
    }
  });
}

function interpolateColor(daysLeft) {
  if (daysLeft >= 200) return "#111827";
  if (daysLeft <= 30) return "#16a34a";
  if (daysLeft < 200 && daysLeft >= 100) {
    const t = (200 - daysLeft) / 100;
    return blend("#111827", "#2563eb", t);
  }
  if (daysLeft < 100 && daysLeft > 30) {
    const t = (100 - daysLeft) / 70;
    return blend("#2563eb", "#16a34a", t);
  }
}

function blend(c1, c2, t) {
  const parseHex = c => [parseInt(c.substr(1, 2), 16), parseInt(c.substr(3, 2), 16), parseInt(c.substr(5, 2), 16)];
  const [r1, g1, b1] = parseHex(c1);
  const [r2, g2, b2] = parseHex(c2);
  return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`;
}

function isSameDay(d1, d2) {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}

function renderConcerts(concerts) {
  const now = new Date();
  const upcomingList = document.getElementById("upcoming-list");
  const archiveList = document.getElementById("archive-list");

  const upcoming = concerts.filter(c => new Date(c.datetime) >= now).sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  const past = concerts.filter(c => new Date(c.datetime) < now).sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  upcoming.forEach(c => upcomingList.appendChild(createConcertCard(c, false)));
  past.forEach(c => archiveList.appendChild(createConcertCard(c, true)));

  updateCountdowns();
  setInterval(updateCountdowns, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  loadConcerts();

  const toggle = document.querySelector(".archive-toggle");
  const arrow = document.querySelector(".arrow");
  const archive = document.getElementById("archive-list");