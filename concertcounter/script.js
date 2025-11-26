// Concertgegevens – voeg hier nieuwe concerten toe
const concerts = [
{ artist: "Guns N' Roses", location: "Goffertpark – Nijmegen", datetime: "2017-07-12T19:30:00" },
{ artist: "Toto", location: "Ziggo Dome – Amsterdam", datetime: "2018-03-17T20:00:00" }, 
{ artist: "Guus Meeuwis", location: "Philips Stadion – Eindhoven", datetime: "2018-06-09T20:30:00" }, 
{ artist: "Guns N' Roses", location: "Goffertpark – Nijmegen", datetime: "2018-07-04T19:30:00" },  
{ artist: "Europe", location: "013 – Tilburg", datetime: "2018-09-26T21:00:00" },
{ artist: "Slash & Myles Kennedy", location: "AFAS Live – Amsterdam", datetime: "2019-02-24T20:30:00" },
{ artist: "The Dire Straits Experience", location: "Kampen Music Club – Kampen", datetime: "2019-05-18T21:00:00" },
{ artist: "Metallica", location: "Johan Cruijff Arena – Amsterdam", datetime: "2019-06-11T20:45:00" },
{ artist: "Bon Jovi", location: "Goffertpark – Nijmegen", datetime: "2019-06-13T20:30:00" },
{ artist: "Guus Meeuwis", location: "Philips Stadion – Eindhoven", datetime: "2019-06-15T20:30:00" },
{ artist: "Rammstein", location: "De Kuip – Rotterdam", datetime: "2019-06-25T20:45:00" },
{ artist: "Live", location: "Paradiso – Amsterdam", datetime: "2019-07-02T20:30:00" },
{ artist: "Alter Bridge", location: "AFAS Live – Amsterdam", datetime: "2019-12-10T20:00:00" },
{ artist: "Steel Panther", location: "Tivoli Vredenburg – Utrecht", datetime: "2019-02-02T20:00:00" },
{ artist: "A-ha", location: "AFAS Live – Amsterdam", datetime: "2022-05-04T21:00:00" },
{ artist: "Disturbed", location: "Ziggo Dome – Amsterdam", datetime: "2025-10-14T20:00:00" },
{ artist: "Red Hot Chili Peppers", location: "Goffertpark - Nijmegen", datetime: "2022-06-10T20:30:00" },
{ artist: "Europe", location: "Hello Festival - Emmen", datetime: "2022-06-11T22:45:00" },
{ artist: "Metallica", location: "Pinkpop Festival - Landgraaf", datetime: "2022-06-17T22:15:00" },
{ artist: "Guns N' Roses", location: "Stadspark - Groningen", datetime: "2022-06-23T19:45:00" },
{ artist: "Iron Maiden", location: "Gelredome - Arnhem", datetime: "2022-06-27T21:00:00" },
{ artist: "Rammstein", location: "Goffertpark - Nijmegen", datetime: "2022-07-04T20:30:00" },
{ artist: "Rammstein", location: "Goffertpark - Nijmegen", datetime: "2022-07-05T20:30:00" },
{ artist: "The Killers", location: "Ziggo Dome - Amsterdam", datetime: "2022-07-16T21:00:00" },
{ artist: "KISS", location: "Ziggo Dome - Amsterdam", datetime: "2022-07-21T21:00:00" },
{ artist: "Bryan Adams", location: "Ziggo Dome - Amsterdam", datetime: "2022-11-23T20:30:00" },
{ artist: "Within Temptation", location: "Ziggo Dome - Amsterdam", datetime: "2022-11-30T20:15:00" },
{ artist: "Evanescence", location: "Ziggo Dome - Amsterdam", datetime: "2022-11-30T21:30:00" },
{ artist: "Volbeat", location: "Gelredome - Arnhem", datetime: "2022-11-30T21:00:00" },
{ artist: "Roger Waters", location: "Ziggo Dome - Amsterdam", datetime: "2023-04-04T20:15:00" },
{ artist: "Avril Lavigne", location: "AFAS Live - Amsterdam", datetime: "2023-04-14T21:00:00" },
{ artist: "Metallica", location: "Johan Cruijff Arena - Amsterdam", datetime: "2023-04-29T20:30:00" },
{ artist: "Sabaton", location: "Ziggo Dome - Amsterdam", datetime: "2023-05-03T21:15:00" },
{ artist: "Normaal", location: "Tractorpulling terrein - Lochem", datetime: "2023-05-18T19:45:00" },
{ artist: "The Offspring", location: "AFAS Live - Amsterdam", datetime: "2023-05-20T21:15:00" },
{ artist: "Def Leppard", location: "SparkassenPark - Mönchengladbach", datetime: "2023-05-25T18:45:00" },
{ artist: "Motley Crue", location: "SparkassenPark - Mönchengladbach", datetime: "2023-05-25T20:45:00" },
{ artist: "Ghost", location: "AFAS Live - Amsterdam", datetime: "2023-06-04T21:30:00" },
{ artist: "KISS", location: "Ziggo Dome - Amsterdam", datetime: "2023-06-12T21:00:00" },
{ artist: "Rammstein", location: "Stadspark - Groningen", datetime: "2023-07-06T20:30:00" },
{ artist: "Guns N' Roses", location: "Bospop terrein - Weert", datetime: "2023-07-11T19:45:00" },
{ artist: "Slash & Myles Kennedy", location: "Ziggo Dome - Amsterdam", datetime: "2024-04-09T20:30:00" },
{ artist: "AC-DC", location: "Johan Cruijff Arena - Amsterdam", datetime: "2024-06-05T20:45:00" },
{ artist: "Judas Priest", location: "AFAS Live - Amsterdam", datetime: "2024-06-10T21:00:00" },
{ artist: "Scorpions", location: "Ziggo Dome - Amsterdam", datetime: "2024-06-11T21:00:00" },
{ artist: "Eagles", location: "Gelredome - Arnhem", datetime: "2024-06-13T21:00:00" },
{ artist: "Guus Meeuwis", location: "Philips Stadion - Eindhoven", datetime: "2024-06-16T21:00:00" },
{ artist: "Rammstein", location: "Goffertpark - Nijmegen", datetime: "2024-06-18T20:30:00" },
{ artist: "Green Day", location: "Gelredome - Arnhem", datetime: "2024-06-19T20:30:00" },
{ artist: "Steel Panther", location: "Oosterpoort - Groningen", datetime: "2024-06-23T21:00:00" },
{ artist: "Avenged Sevenfold", location: "Ziggo Dome - Amsterdam", datetime: "2024-06-24T21:00:00" },
{ artist: "Bruce Springsteen", location: "Goffertpark - Nijmegen", datetime: "2024-06-27T20:00:00" },
{ artist: "Deep Purple", location: "Ziggo Dome - Amsterdam", datetime: "2024-10-29T21:00:00" },
{ artist: "Within Temptation", location: "Ziggo Dome - Amsterdam", datetime: "2024-12-06T21:15:00" },
{ artist: "Toto", location: "Gelredome - Arnhem", datetime: "2025-02-08T21:00:00" },
{ artist: "Ghost", location: "Ziggo Dome - Amsterdam", datetime: "2025-05-08T21:00:00" },
{ artist: "Normaal", location: "Tractorpulling terrein - Lochem", datetime: "2025-05-29T20:00:00" },
{ artist: "John Fogerty", location: "Ziggo Dome - Amsterdam", datetime: "2025-06-23T20:30:00" },
{ artist: "Linkin Park", location: "Gelredome - Arnhem", datetime: "2025-06-26T20:30:00" },
{ artist: "Green Day", location: "Ziggo Dome - Amsterdam", datetime: "2025-07-02T20:30:00" },
{ artist: "DragonForce", location: "Tivoli Vredenburg – Utrecht", datetime: "2025-07-06T21:00:00" },
{ artist: "Iron Maiden", location: "Gelredome - Arnhem", datetime: "2025-07-23T21:00:00" },
{ artist: "Alice Cooper", location: "AFAS Live - Amsterdam", datetime: "2025-07-28T20:15:00" },
{ artist: "The Offspring", location: "Ziggo Dome – Amsterdam", datetime: "2025-11-07T19:30:00" },
{ artist: "Sabaton", location: "Ziggo Dome – Amsterdam", datetime: "2025-12-01T19:00:00" },
{ artist: "MetallicA", location: "Deutsche Bank Park – Frankfurt", datetime: "2026-05-22T20:00:00" },
{ artist: "MetallicA", location: "Deutsche Bank Park – Frankfurt", datetime: "2026-05-24T20:00:00" },
{ artist: "Iron Maiden", location: "Ziggo Dome – Amsterdam", datetime: "2026-06-10T20:00:00" },
{ artist: "Guns N' Roses", location: "Ziggo Dome – Amsterdam", datetime: "2026-06-18T20:00:00" },
{ artist: "Guns N' Roses", location: "Ziggo Dome – Amsterdam", datetime: "2026-06-20T20:00:00" }
];

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
  const options = { weekday: "long", day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" };
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

function renderConcerts() {
  const now = new Date();
  const upcomingList = document.getElementById("upcoming-list");
  const archiveList = document.getElementById("archive-list");

  const upcoming = concerts.filter(c => new Date(c.datetime) >= now).sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
  const past = concerts.filter(c => new Date(c.datetime) < now).sort((a, b) => new Date(b.datetime) - new Date(a.datetime));

  const archiveToggle = document.querySelector(".archive-toggle");
  archiveToggle.innerHTML = `<span class="arrow">▼</span> Archief (${past.length})`;

  upcoming.forEach(c => upcomingList.appendChild(createConcertCard(c, false)));
  past.forEach(c => archiveList.appendChild(createConcertCard(c, true)));

  updateCountdowns();
  setInterval(updateCountdowns, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  renderConcerts();

  const toggle = document.querySelector(".archive-toggle");
  const arrow = document.querySelector(".arrow");
  const archive = document.getElementById("archive-list");

  toggle.addEventListener("click", () => {
    archive.classList.toggle("expanded");
    arrow.style.transform = archive.classList.contains("expanded") ? "rotate(180deg)" : "rotate(0deg)";
  });
});



