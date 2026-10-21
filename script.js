let letters = [];
let activeLetterIndex = null;

const listElement = document.getElementById("letterList");
const viewElement = document.getElementById("letterView");

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[character]));
}

function renderList() {
  listElement.innerHTML = letters.map((letter, index) => `
    <button class="letter-item ${activeLetterIndex === index ? "selected" : ""}" type="button" data-index="${index}" aria-pressed="${activeLetterIndex === index}">
      <span class="letter-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="letter-item-text">
        <span class="letter-item-name">${safeText(letter.name)}</span>
        <span class="letter-item-year">Fan since ${safeText(letter.year)}</span>
      </span>
      <span class="letter-arrow" aria-hidden="true">↗</span>
    </button>
  `).join("");

  listElement.querySelectorAll(".letter-item").forEach(button => {
    button.addEventListener("click", () => openLetter(Number(button.dataset.index)));
  });
}

function openLetter(index) {
  activeLetterIndex = index;
  const letter = letters[index];
  const songs = (letter.songs || []).filter(Boolean);
  viewElement.className = "letter-view";
  viewElement.innerHTML = `
    <div class="letter-topline">
      <p class="eyebrow">A FAN LETTER · ${String(index + 1).padStart(2, "0")} / ${String(letters.length).padStart(2, "0")}</p>
      <button class="back-button" type="button" id="backToList">← BACK TO LETTERS</button>
    </div>
    <h3 class="letter-greeting">Dear ${safeText(letter.address || "AleXa")},</h3>
    <p class="letter-from">From ${safeText(letter.name)}</p>
    <div class="letter-meta">
      <div class="meta-box">
        <span class="meta-label">FAN SINCE</span>
        <span class="meta-value">${safeText(letter.year)}</span>
      </div>
      <div class="meta-box">
        <span class="meta-label">TOP 3 FAVOURITE SONGS WRITTEN / PRODUCED BY ALE⚡XA</span>
        <span class="song-list">${songs.length ? songs.map(song => `<span class="song-pill">${safeText(song)}</span>`).join("") : '<span class="meta-value">Not provided</span>'}</span>
      </div>
    </div>
    <p class="letter-body">${safeText(letter.message)}</p>
    <p class="letter-signoff">With love, ${safeText(letter.name)} ♥</p>
  `;
  renderList();
  document.getElementById("backToList").addEventListener("click", backToList);
  if (window.matchMedia("(max-width: 700px)").matches) {
    viewElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function backToList() {
  activeLetterIndex = null;
  renderList();
  viewElement.className = "letter-view empty-view";
  viewElement.innerHTML = `
    <div class="empty-symbol">✉</div>
    <p class="eyebrow">A MESSAGE FOR YOU</p>
    <h3>Every letter holds<br>a little piece of love.</h3>
    <p>Select a letter from the list to read it.</p>
  `;
  if (window.matchMedia("(max-width: 700px)").matches) {
    listElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

async function loadLetters() {
  try {
    const response = await fetch("letters.json");
    if (!response.ok) throw new Error("Could not load letters.json");
    letters = await response.json();
    renderList();
    document.querySelector(".hero-foot span:last-child").innerHTML =
      `${letters.length} FAN LETTERS <b>✦</b>`;
  } catch (error) {
    listElement.innerHTML = '<p class="letter-body">The letters could not be loaded. Please make sure index.html, script.js, style.css, and letters.json are all uploaded to the same folder.</p>';
  }
}

document.getElementById("seeLetters").addEventListener("click", () => {
  document.getElementById("lettersSection").scrollIntoView({ behavior: "smooth" });
  if (window.confetti) {
    window.confetti({ particleCount: 65, spread: 65, origin: { y: 0.65 }, colors: ["#ff3158", "#ff7190", "#ffd56a", "#ffffff"] });
  }
});

loadLetters();
