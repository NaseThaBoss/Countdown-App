let targetDate = null;
let dotsInterval = null;

function updateCountdown() {
    const today = new Date;
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const display = document.getElementById("countdownDisplay");
    const celebration = document.getElementById("celebration");
    const dots = document.getElementById("countdownDots");


    //for the event name display
    let eventName = document.getElementById("eventSelect").value;
    if (eventName === "Custom") {
        eventName = document.getElementById("customEventName").value || "Your Event";
    }


    //for interval of remaining days
    if (diffDays > 0) {
        display.textContent = `${diffDays} day(s) remaining ${eventName}`;
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
            display.textContent = `🎉 ${eventName} 🎉`;
            celebration.textContent = "Congratulations! The D-DAY is here!";
            popConfetti();
        } else {
            display.textContent = `😢 ${eventName} has passed 😢`;
            celebration.innerHTML = "";
        }
    }

    //for the progress bar update
    const progressBar = document.getElementById("progressBar");
    const ddayStartRaw = localStorage.getItem("ddayStart");
    const dateStart = ddayStartRaw ? new Date(ddayStartRaw) : today; //date when countdown was set
    const totalDuration = targetDate - dateStart;
    const timeGone = today - dateStart;
    let progress = 0;
    if (totalDuration > 0 && timeGone > 0) {
        progress = Math.min((timeGone / totalDuration) * 100, 100);
    }
    progressBar.style.width = progress + "%";



};
document.getElementById("customEventName").addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        const customEventInput = document.getElementById("customEventName");
        const eventSelect = document.getElementById("eventSelect");
        const customValue = customEventInput.value.trim();
        if (customValue) {
            //update the custom value to the text entered
            const customOption = eventSelect.querySelector('option[value="Custom"]');
            customOption.textContent = customValue;
            customOption.selected = true;
            customEventInput.style.display = "none";
        }

    }
});

document.getElementById("eventSelect").addEventListener("change", function () {
    const customEventInput = document.getElementById("customEventName");
    const customOption = this.querySelector('option[value="Custom"]');
    if (this.value === "Custom") {
        customEventInput.style.display = "block";
        customEventInput.focus();
        //Reset the custom text
        customOption.textContent = "Custom";
    } else {
        customEventInput.style.display = "none";
        customEventInput.value = "";
    }
});



function setEventDate() {
    const input = document.getElementById("eventDate").value;
    if (!input) return alert("Please Select a Date!");
    localStorage.setItem("ddayStart", new Date().toISOString());
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
    const savedStart = localStorage.getItem("ddayStart");
    if (savedDate) {
        targetDate = new Date(savedDate);
        document.getElementById("eventDate").value = savedDate;
        if (!savedStart) {
            localStorage.setItem("ddayStart", new Date().toISOString());
        }
        updateCountdown();
    }
};


console.log("targetDate:", targetDate);