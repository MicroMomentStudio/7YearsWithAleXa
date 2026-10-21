// STAGE SWITCHER
function switchStages(currentId, nextId) {
  const current = document.getElementById(currentId);
  const next = document.getElementById(nextId);
  if (!current || !next) return;
  current.classList.remove("active");
  current.classList.add("hidden");
  next.classList.remove("hidden");
  next.classList.add("active");
}

// STAGE 1: OPEN THE ENVELOPE
function openEnvelope() {
  if (typeof confetti === "function") {
    confetti({particleCount: 130, spread: 95, origin: {y: 0.55},
      colors: ["#e91e63", "#ff69b4", "#ff1493", "#ffb6c1", "#ffffff"]});
  }
  setTimeout(() => switchStages("envelope-stage", "cake-stage"), 500);
}

// STAGE 2: MAKE A WISH AND BLOW OUT THE CANDLES
let candleBlown = false;
function blowCandle() {
  if (candleBlown) return;
  candleBlown = true;
  document.getElementById("candleFlame").textContent = "💨✨";
  document.getElementById("cake-msg").textContent = "May all your wishes come true, AleXa! Happy 7th debut anniversary! 💗";
  if (typeof confetti === "function") {
    confetti({particleCount: 100, spread: 90, origin: {y: 0.4},
      colors: ["#ffd700", "#ffeb3b", "#ffffff", "#ff69b4"]});
  }
  setTimeout(() => switchStages("cake-stage", "gift-stage"), 1700);
}

// STAGE 3: GROWING GIFT BOX
let giftClicks = 0;
const maxGiftClicks = 5;
function growGift() {
  if (giftClicks >= maxGiftClicks) return;
  giftClicks++;
  const gift = document.getElementById("growingGift");
  const instruction = document.getElementById("growth-instruction");
  gift.style.transform = `scale(${1 + giftClicks * 0.14})`;
  const remaining = maxGiftClicks - giftClicks;
  if (remaining > 0) {
    instruction.textContent = `Tap (${remaining}) more time${remaining === 1 ? "" : "s"} to unwrap your gift!`;
  } else {
    gift.textContent = "💖";
    instruction.textContent = "A gift filled with love from your fans!";
    if (typeof confetti === "function") {
      confetti({particleCount: 120, spread: 90, origin: {y: 0.6},
        colors: ["#e91e63", "#ff69b4", "#ffffff", "#ffd700"]});
    }
    setTimeout(() => switchStages("gift-stage", "coupons-stage"), 1000);
  }
}

// STAGE 5 TO FINALE
function goToFinale() {
  switchStages("promise-stage", "finale-stage");
  startFallingHearts();
  renderLetterList();
}

let heartsStarted = false;
function startFallingHearts() {
  if (heartsStarted) return;
  heartsStarted = true;
  const container = document.getElementById("heartsContainer");
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "falling-heart";
    heart.textContent = Math.random() > 0.5 ? "💖" : (Math.random() > 0.5 ? "⚡" : "✨");
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 3 + 3) + "s";
    heart.style.fontSize = (Math.random() * 12 + 13) + "px";
    container.appendChild(heart);
    setTimeout(() => heart.remove(), 6500);
  }, 500);
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
}

function renderLetterList() {
  const list = document.getElementById("letter-list");
  const detail = document.getElementById("letter-detail");
  detail.classList.add("hidden");
  list.classList.remove("hidden");
  list.innerHTML = fanLetters.map((letter, index) => `
    <button class="letter-button" type="button" data-index="${index}">
      <span class="letter-num">${String(index + 1).padStart(2, "0")}</span>
      <span class="letter-button-copy">
        <span class="letter-name">${escapeHTML(letter.name)}</span>
        <span class="letter-year">Fan since ${escapeHTML(letter.year)}</span>
      </span>
      <span class="letter-arrow" aria-hidden="true">♡</span>
    </button>
  `).join("");
  list.querySelectorAll(".letter-button").forEach(button => {
    button.addEventListener("click", () => openFanLetter(Number(button.dataset.index)));
  });
}

function openFanLetter(index) {
  const letter = fanLetters[index];
  if (!letter) return;
  const list = document.getElementById("letter-list");
  const detail = document.getElementById("letter-detail");
  const songs = (letter.songs || []).filter(Boolean);
  list.classList.add("hidden");
  detail.classList.remove("hidden");
  detail.innerHTML = `
    <div class="letter-toolbar">
      <span class="letter-count">FAN LETTER ${String(index + 1).padStart(2, "0")} / ${String(fanLetters.length).padStart(2, "0")}</span>
      <button type="button" class="back-btn" id="backToLetterList">← Back to list</button>
    </div>
    <h2 class="letter-greeting">Dear ${escapeHTML(letter.address || "AleXa")},</h2>
    <p class="letter-from">From ${escapeHTML(letter.name)}</p>
    <div class="letter-meta">
      <div class="meta-card"><span class="meta-label">FAN SINCE</span><span class="meta-value">${escapeHTML(letter.year)}</span></div>
      <div class="meta-card"><span class="meta-label">TOP 3 FAVOURITE SONGS WRITTEN / PRODUCED BY ALE⚡XA</span>
        <span class="songs">${songs.length ? songs.map(song => `<span class="song">${escapeHTML(song)}</span>`).join("") : '<span class="meta-value">Not provided</span>'}</span>
      </div>
    </div>
    <p class="letter-message">${escapeHTML(letter.message)}</p>
    <p class="letter-signoff">With love, ${escapeHTML(letter.name)} ♥</p>
  `;
  document.getElementById("backToLetterList").addEventListener("click", renderLetterList);
  detail.scrollIntoView({behavior:"smooth", block:"nearest"});
}

document.addEventListener("DOMContentLoaded", () => {
  // Support keyboard activation of the envelope icon.
  const envelope = document.querySelector("#envelope-stage .emoji");
  envelope.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openEnvelope();
    }
  });
});
