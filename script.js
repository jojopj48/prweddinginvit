const weddingData = {
    groom: "Akhil",
    bride: "Kavya",
    date: "May 13, 2026",
    message: "As we get ready to say 'I do', we feel grateful for the wonderful people in our lives. With love in our hearts and the blessings of our families, we warmly invite you to join us on our wedding day.",
    families: {
        groom: "Son of RajendraPrasad and Rugmini",
        bride: "Daughter of Sugumaran and Sarala"
    },
    events: [
        { time: "9.30 AM", title: "Wedding Ceremony at Seethadevi Temple, Pulpally" },
        { time: "11.00 AM onwards", title: "Reception at Kabani Auditorium, Pulpally" }
    ],
    venues: [
        {
            label: "Wedding Ceremony",
            name: "Seethadevi Temple",
            address: "Pulpally",
            mapUrl: "https://www.google.com/maps/search/?api=1&query=Seethadevi%20Temple%20Pulpally"
        },
        {
            label: "Reception",
            name: "Kabani Auditorium",
            address: "Pulpally",
            mapUrl: "https://www.google.com/maps/d/u/0/viewer?source=s_q&hl=en&geocode&ie=UTF8&msa=0&ll=11.789683000000023%2C76.16505389999999&spn=0.514504%2C0.832214&z=18&mid=1BuGZcCr8xqbsAz_T6KW6VO3JoSw"
        }
    ]
};

const weddingDate = new Date("2026-05-13T09:30:00+05:30");
const openingScreen = document.getElementById("openingScreen");
const videoBackdrop = document.getElementById("videoBackdrop");
const petals = document.getElementById("petals");
const revealItems = document.querySelectorAll(".reveal");

function renderWeddingData() {
    document.title = `${weddingData.groom} & ${weddingData.bride} | Wedding Invitation`;
    document.getElementById("groomName").textContent = weddingData.groom;
    document.getElementById("brideName").textContent = weddingData.bride;
    document.getElementById("heroDate").textContent = weddingData.date;
    document.getElementById("messageText").textContent = weddingData.message;
    document.getElementById("familyGroomName").textContent = weddingData.groom;
    document.getElementById("familyBrideName").textContent = weddingData.bride;
    document.getElementById("familyGroomText").textContent = weddingData.families.groom;
    document.getElementById("familyBrideText").textContent = weddingData.families.bride;
    document.getElementById("datePrimary").textContent = weddingData.date;
    document.getElementById("dateSecondary").textContent = "Wednesday, Wedding Ceremony";

    document.getElementById("timeline").innerHTML = weddingData.events.map((event) => `
        <article class="glass-card timeline-item">
            <span class="timeline-time">${event.time}</span>
            <div class="timeline-copy">${event.title}</div>
        </article>
    `).join("");

    document.getElementById("venueList").innerHTML = weddingData.venues.map((venue) => `
        <article class="glass-card venue-card">
            <span class="venue-label">${venue.label}</span>
            <h3>${venue.name}</h3>
            <p>${venue.address}</p>
            <a class="ghost-button venue-button" href="${venue.mapUrl}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
        </article>
    `).join("");
}

function pad(value) {
    return String(value).padStart(2, "0");
}

function updateCountdown() {
    const diff = weddingDate - new Date();

    if (diff <= 0) {
        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";
        return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    document.getElementById("days").textContent = pad(days);
    document.getElementById("hours").textContent = pad(hours);
    document.getElementById("minutes").textContent = pad(minutes);
    document.getElementById("seconds").textContent = pad(seconds);
}

function openInvitation() {
    document.body.classList.add("invitation-open");
    openingScreen.classList.add("is-opening");
    videoBackdrop.classList.add("is-visible");

    window.setTimeout(() => {
        openingScreen.hidden = true;
    }, 1850);
}

function createPetals() {
    for (let i = 0; i < 8; i += 1) {
        const petal = document.createElement("img");
        petal.src = "assets/petal.png";
        petal.alt = "";
        petal.className = "petal";
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.width = `${20 + Math.random() * 26}px`;
        petal.style.animationDelay = `${Math.random() * 10}s`;
        petal.style.animationDuration = `${12 + Math.random() * 8}s`;
        petal.style.opacity = `${0.3 + Math.random() * 0.4}`;
        petals.appendChild(petal);
    }
}

function setupRevealObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.18, rootMargin: "0px 0px -8% 0px" });

    revealItems.forEach((item) => observer.observe(item));
}

openingScreen.addEventListener("click", openInvitation);
openingScreen.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openInvitation();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    renderWeddingData();
    createPetals();
    setupRevealObserver();
    updateCountdown();
    window.setInterval(updateCountdown, 1000);
});
