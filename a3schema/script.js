let matches = [];

async function loadMatches() {
  const response = await fetch("matches.json");
  const text = await response.text();
  matches = text
    .trim()
    .split("\n")
    .map(line => JSON.parse(line));
  renderMatches();
}

document.addEventListener("DOMContentLoaded", loadMatches);

function renderMatches() {
  const container = document.getElementById("match-list");
  container.innerHTML = "";
  const now = new Date();

  matches
    .filter(m => new Date(m.datetime) >= now)
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime))
    .forEach(match => container.appendChild(createMatchCard(match)));

  updateCountdowns();
  setInterval(updateCountdowns, 1000);
}

function createMatchCard(match) {
  const card = document.createElement("div");
  card.classList.add("match-card");
  card.dataset.datetime = match.datetime;

  card.innerHTML = `
    <div class="info">
      <div class="details">
        <h3>🆚 ${match.opponent}</h3>
        <p>📍 ${match.location}</p>
        <div class="date">${formatDate(match.datetime)}</div>
      </div>
      <div class="countdown"></div>
    </div>
  `;
  return card;
}

function updateCountdowns() {
  const now = new Date();
  document.querySelectorAll(".match-card").forEach(card => {
    const target = new Date(card.dataset.datetime);
    const diff = target - now;
    const el = card.querySelector(".countdown");

    if (diff <= 0) {
      el.textContent = "Gestart 🎯";
      el.classList.add("started");
      return;
    }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    el.textContent = `${d}d ${h}u ${m}m`;
  });
}

function formatDate(dt) {
  return new Date(dt).toLocaleDateString("nl-NL", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).replace(" om", " –");
}
