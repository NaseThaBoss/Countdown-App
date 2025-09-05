let targetDate = null;
let dotsInterval = null;

function updateCountdown() {
    const today = new Date;
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const display = document.getElementById("countdownDisplay");
    const celebration = document.getElementById("celebration");
    const dots = document.getElementById("countdownDots");

    if (diffDays > 0) {
        display.textContent = `${diffDays} day(s) remaining`;
        celebration.textContent = "";
        dots.style.display = "inline-block";
        if (!dotsInterval) {
            let dotCount = 0;
            dotsInterval = setInterval(() => {
                dotCount = (dotCount + 1) % 4;
                dots.textContent = '.'.repeat(dotCount);
            }, 400);
        }
        // dots.textContent = "...";
    } else {
        dots.style.display = "none";
        dots.textContent = "";
        if (dotsInterval) {
            clearInterval(dotsInterval);
            dotsInterval = null;
        }
        if (diffDays === 0) {
            display.textContent = "🎉 D-DAY 🎉";
            celebration.textContent = "Congratulations! The D-DAY is here!";
            popConfetti();
        } else {
            display.textContent = "😢 The D-DAY has passed 😢"
            celebration.innerHTML = "";
        }
    }
};



function setEventDate() {
    const input = document.getElementById("eventDate").value;
    if (!input) return alert("Please Select a Date!");
    document.getElementById("spinnerOverlay").classList.add("active");

    setTimeout(() => {
        targetDate = new Date(input);
        localStorage.setItem("dday", input);
        updateCountdown();
        document.getElementById("spinnerOverlay").classList.remove("active");
    }, 1000);
}

function popConfetti() {
    const confettiContainer = document.getElementById("confetti");
    confettiContainer.innerHTML = ""; //clear previous conffetti
    const emojis = ["🎉", "✨", "🎊", "🥳", "💥"];
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement("span");
        confetti.className = "confetti-piece";
        confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.top = "-2rem";
        confetti.style.animationDelay = (Math.random() * 1.5) + "s";
        confettiContainer.appendChild(confetti);
    }
    setTimeout(() => { confettiContainer.innerHTML = ""; }, 3000)
}

window.onload = () => {
    const savedDate = localStorage.getItem("dday");
    if (savedDate) {
        targetDate = new Date(savedDate);
        document.getElementById("eventDate").value = savedDate,
            updateCountdown()
    }
};


