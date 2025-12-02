// =========================================================
// LOAD JSON
// =========================================================

let concerts = [];

async function loadConcerts() {
  try {
    const response = await fetch("concertcounter/concerts.json");
    concerts = await response.json();
    renderConcerts(); // Start pas als JSON geladen is
  } catch (err) {
    console.error("Cannot load concerts JSON:", err);
  }
}

document.addEventListener("DOMContentLoaded", loadConcerts);

// =========================================================
// HULPFUNCTIES
// =========================================================

function diffYMDDays(target, now) {
  let years = now.getFullYear() - target.getFullYear();
  let months = now.getMonth() - target.getMonth();
  let days = now.getDate() - target.getDate();

  if (days < 0) {
    months--;
    const prevMonthDays = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthDays;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

// =========================================================
// STATISTIEKEN
// =========================================================

function generateStats(past) {
  const artistStats = {};
  const locationStats = {};
  const weekdayStats = { 1:0,2:0,3:0,4:0,5:0,6:0,0:0 };

  past.forEach(c => {
    const d = new Date(c.datetime);
    const wd = d.getDay();

    artistStats[c.artist] = (artistStats[c.artist] || 0) + 1;
    locationStats[c.location] = (locationStats[c.location] || 0) + 1;
    weekdayStats[wd]++;
  });

  const sortedArtists = Object.entries(artistStats).sort((a,b)=>b[1]-a[1]);
  const sortedLocations = Object.entries(locationStats).sort((a,b)=>b[1]-a[1]);

  const weekdayNames = ["Zondag","Maandag","Dinsdag","Woensdag","Donderdag","Vrijdag","Zaterdag"];
  const weekdayOrder = [1,2,3,4,5,6,0];

  return { sortedArtists, sortedLocations, weekdayStats, weekdayNames, weekdayOrder };
}

// =========================================================
// NIEUWE STATISTIEKEN
// =========================================================

function generateYearStats(past) {
  const stats = {};
  const firstYear = 2017;
  const currentYear = new Date().getFullYear();

  for (let y = firstYear; y <= currentYear; y++) stats[y] = 0;

  past.forEach(c => {
    const year = new Date(c.datetime).getFullYear();
    if (stats[year] !== undefined) stats[year]++;
  });

  return stats;
}

function generateExtraStats(past) {
  if (past.length === 0) {
    return {
      busiestMonth: ["n.v.t.", 0],
      busiestYear: ["n.v.t.", 0],
      totalConcerts: 0,
      uniqueArtists: 0,
      uniqueLocations: 0,
      avgDaysBetween: 0
    };
  }

  const monthCounts = {};
  const yearCounts = {};
  const artists = new Set();
  const locations = new Set();
  const dates = past.map(c => new Date(c.datetime)).sort((a, b) => a - b);

  past.forEach(c => {
    const d = new Date(c.datetime);
    const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;

    monthCounts[ym] = (monthCounts[ym] || 0) + 1;
    yearCounts[d.getFullYear()] = (yearCounts[d.getFullYear()] || 0) + 1;

    artists.add(c.artist);
    locations.add(c.location);
  });

  const busiestMonth = Object.entries(monthCounts).sort((a,b)=>b[1]-a[1])[0];
  const busiestYear  = Object.entries(yearCounts).sort((a,b)=>b[1]-a[1])[0];

  let totalDiff = 0;
  for (let i = 1; i < dates.length; i++) {
    totalDiff += (dates[i] - dates[i - 1]) / (1000 * 60 * 60 * 24);
  }
  const avgDaysBetween = dates.length > 1 ? Math.round(totalDiff / (dates.length - 1)) : 0;

  return {
    busiestMonth,
    busiestYear,
    totalConcerts: past.length,
    uniqueArtists: artists.size,
    uniqueLocations: locations.size,
    avgDaysBetween
  };
}

// =========================================================
// RENDER STATISTIEKEN
// =========================================================

function renderStatsBlock(past) {
  const { sortedArtists, sortedLocations, weekdayStats, weekdayNames, weekdayOrder } = generateStats(past);

  const yearStats = generateYearStats(past);
  const extra = generateExtraStats(past);

  const container = document.createElement("div");
  container.style.marginTop = "30px";
  container.style.padding = "20px";
  container.style.background = "#eef2f7";
  container.style.borderRadius = "12px";

  const colArtists = `
    <div style="min-width:200px; flex:1;">
      <h3>🎤 Artiesten</h3>
      <ul>${sortedArtists.map(([n,v]) => `<li>${n}: <strong>${v}×</strong></li>`).join("")}</ul>
    </div>`;

  const colLoc = `
    <div style="min-width:200px; flex:1;">
      <h3>📍 Locaties</h3>
      <ul>${sortedLocations.map(([l,v]) => `<li>${l}: <strong>${v}×</strong></li>`).join("")}</ul>
    </div>`;

  const colDaysAndYears = `
    <div style="min-width:200px; flex:1;">
      <h3>📅 Per dag/maand</h3>
      <ul>
        ${weekdayOrder.map(i => `<li>${weekdayNames[i]}: <strong>${weekdayStats[i]}×</strong></li>`).join("")}
      </ul>

      <div style="height:12px;"></div>

      <ul>
        ${Object.entries(yearStats).map(([y,c]) => `<li>${y}: <strong>${c}×</strong></li>`).join("")}
      </ul>
    </div>`;

  const colExtra = `
    <div style="width:100%; margin-top:20px;">
      <h3>📌 Overige statistieken</h3>
      <ul>
        <li>Drukste maand ooit: <strong>${extra.busiestMonth[0]}</strong> (${extra.busiestMonth[1]}×)</li>
        <li>Jaar met meeste concerten: <strong>${extra.busiestYear[0]}</strong> (${extra.busiestYear[1]}×)</li>
        <li>Unieke artiesten bezocht: <strong>${extra.uniqueArtists} artiesten</strong></li>
        <li>Unieke locaties bezocht: <strong>${extra.uniqueLocations} locaties</strong></li>
        <li>Totaal aantal concerten bezocht: <strong>${extra.totalConcerts} concerten</strong></li>
        <li>Gem. dagen tussen concerten: <strong>${extra.avgDaysBetween}</strong></li>
      </ul>
    </div>`;

  container.innerHTML = `
    <h2 style="margin-top:0; margin-bottom:15px; font-size:18px;">📊 Statistieken</h2>

    <div style="display:flex; gap:30px; flex-wrap:wrap;">
      ${colArtists}
      ${colLoc}
      ${colDaysAndYears}
    </div>

    ${colExtra}
  `;

  return container;
}

// =========================================================
// CONCERTKAARTEN
// =========================================================

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

  if (isPast) card.classList.add("past");
  return card;
}

function formatDate(datetime) {
  const date = new Date(datetime);
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  };
  return date.toLocaleDateString("nl-NL", options).replace(" om", " –");
}

// =========================================================
// COUNTDOWNS
// =========================================================

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

    const diffMs = target - now;

    if (diffMs > 0) {
      const days = Math.floor(diffMs / 86400000);
      const hours = Math.floor((diffMs / 3600000) % 24);
      const minutes = Math.floor((diffMs / 60000) % 60);

      countdownEl.textContent = `${days}d ${hours}u ${minutes}m`;
      countdownEl.classList.remove("finished");
      return;
    }

    const daysAgo = Math.floor((now - target) / 86400000);
    const diff = diffYMDDays(target, now);
    const ymd = `${diff.years} jaar, ${diff.months} maanden en ${diff.days} dagen geleden`;

    countdownEl.innerHTML = `
      ${daysAgo} dagen geleden 🎶
      <br>
      <small style="font-size:11px; opacity:0.7;">${ymd}</small>
    `;

    countdownEl.classList.add("finished");
  });
}

function isSameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

// =========================================================
// RENDER ALLES
// =========================================================

function renderConcerts() {
  const now = new Date();
  const upcomingList = document.getElementById("upcoming-list");
  const archiveList = document.getElementById("archive-list");

  const upcoming = concerts
    .filter(c => new Date(c.datetime) >= now)
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  const past = concerts
    .filter(c => new Date(c.datetime) < now)
    .sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  const archiveToggle = document.querySelector(".archive-toggle");
  archiveToggle.innerHTML = `<span class="arrow">▼</span> Archief (${past.length})`;

  past.forEach(c => archiveList.appendChild(createConcertCard(c, true)));

  archiveList.appendChild(renderStatsBlock(past));

  upcoming.forEach(c => upcomingList.appendChild(createConcertCard(c, false)));

  updateCountdowns();
  setInterval(updateCountdowns, 1000);

  // Toggle (staat nu op de juiste plek!)
  const toggle = document.querySelector(".archive-toggle");
  const arrow = document.querySelector(".arrow");
  const archive = document.getElementById("archive-list");

  toggle.addEventListener("click", () => {
    archive.classList.toggle("expanded");
    arrow.style.transform = archive.classList.contains("expanded")
      ? "rotate(180deg)"
      : "rotate(0deg)";
  });
}

