// --- HELPER STAGE SWITCHER ---
function switchStages(currentId, nextId) {
    document.getElementById(currentId).classList.remove('active');
    document.getElementById(currentId).classList.add('hidden');

    const nextStage = document.getElementById(nextId);
    nextStage.classList.remove('hidden');
    nextStage.classList.add('active');
}

// --- STAGE 1: OPEN ENVELOPE ---
function openEnvelope() {
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#e91e63', '#ff69b4', '#ff1493', '#ffb6c1', '#ffffff']
    });

    setTimeout(() => {
        switchStages('envelope-stage', 'cake-stage');
    }, 800);
}

// --- STAGE 2: BLOW CANDLE & WISH ---
function blowCandle() {
    const candle = document.getElementById('candleFlame');
    candle.textContent = "💨✨";
    document.getElementById('cake-msg').textContent = "May all your wishes come true this year! ✨";

    confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.3 },
        shapes: ['star', 'circle'],
        colors: ['#ffd700', '#ffeb3b', '#ffffff']
    });

    setTimeout(() => {
        switchStages('cake-stage', 'gift-stage');
    }, 1500);
}

// --- STAGE 3: GROWING GIFT BOX ---
let giftClicks = 0;
const maxClicks = 5;

function growGift() {
    giftClicks++;
    let giftBox = document.getElementById('growingGift');
    let instruction = document.getElementById('growth-instruction');

    let scaleVal = 1 + (giftClicks * 0.15);
    giftBox.style.transform = `scale(${scaleVal})`;

    let remaining = maxClicks - giftClicks;

    if (remaining > 0) {
        instruction.textContent = `Tap (${remaining}) more times to unwrap the gift!`;
    } else {
        giftBox.textContent = "💖";
        giftBox.style.transform = "scale(1.5)";
        
        confetti({
            particleCount: 120,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#e91e63', '#ff69b4', '#ffffff']
        });

        setTimeout(() => {
            switchStages('gift-stage', 'coupons-stage');
        }, 1000);
    }
}

// --- FINALE TRANSITION (START FALLING HEARTS) ---
function goToFinale() {
    switchStages('promise-stage', 'finale-stage');
    startFallingHearts();
}

// --- BACKGROUND FALLING HEARTS GENERATOR ---
function startFallingHearts() {
    const container = document.getElementById('heartsContainer');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('falling-heart');
        heart.innerHTML = Math.random() > 0.5 ? '💖' : '✨';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        container.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 5000);
    }, 300);
}
