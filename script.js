const SERVICES = {
  webdev: {
    code: "SERV / 01 — WEB-DEV",
    title: "Web Development",
    description:
      "We design and build fast, responsive websites and web applications — from landing pages to full products. Clean code, thoughtful UX, and performance that holds up on any device.",
       video: "https://www.youtube.com/embed/InR3hao6qlA?si=0wp_ravUE-G2hM_8", 
    whatsappText: "Hi Malwike Technologies, I'd like to talk about Web Development."
  },
  social: {
    code: "SERV / 02 — SOCIAL",
    title: "Social Media Management",
    description:
      "Strategy, content calendars and day-to-day management that keep your brand consistent, active and growing across every platform so you can focus on running the business.",
       video: "https://www.youtube.com/embed/wQ5iY7yMVvA?si=1Hyc58daRRIaKMGl", 
    whatsappText: "Hi Malwike Technologies, I'd like to talk about Social Media Management."
  },
  music: {
    code: "SERV / 03 — MUSIC",
    title: "Custom Music Creation",
    description:
      "Original scores, jingles, and soundtracks composed for events, campaigns, and every occasion. For ads, videos, podcasts and product launches. Every track built from a blank page for you.",
       video: "https://www.youtube.com/embed/SM_MBfm5qK4?si=BREJDcGWPPx6ff6c", 
    whatsappText: "Hi Malwike Technologies, I'd like to talk about Custom Music Creation."
  },
  video: {
    code: "SERV / 04 — VIDEO",
    title: "Video Editing",
    description:
      "Polished, story-driven edits for ads, socials and brand films. We take raw footage and turn it into a finished cut that's ready to publish, on schedule.",
    video: "https://www.youtube.com/embed/8tt4hVHiG2Y?si=6PVBv6bIRg0cSoTb", 
    
    whatsappText: "Hi Malwike Technologies, I'd like to talk about Video Editing."
  }
};
 
const WHATSAPP_NUMBER = "254759700444"; // TODO: replace with real WhatsApp number
const CONTACT_EMAIL = "malwike.tech@gmail.com"; // TODO: replace with real email
 
// ---- Our Work data (replace youtubeId with your real video IDs) ----
const WORK_ITEMS = {
  "proposal-music": {
    tag: "MUSIC",
    title: "Proposal Music",
    description: "The song is called \"WYMM\": We Have a Song for Every Occasion, making your proposal unforgettable with music that expresses every heartfelt emotion.",
    youtubeId: "SM_MBfm5qK4"
  },
  "launch-day": {
    tag: "VIDEO",
    title: "Advertisement",
    description: "Abroad Consultancy KE Promo Video.",
    youtubeId: "8tt4hVHiG2Y"
  }
};
 
 
// ---- Our Work filter ----
const filterButtons = document.querySelectorAll(".filter-btn");
const workItems = document.querySelectorAll(".work-item");
 
function applyWorkFilter(filter) {
  workItems.forEach(item => {
    item.classList.toggle("hidden", item.dataset.category !== filter);
  });
}
 
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("active");
    btn.setAttribute("aria-pressed", "true");
    applyWorkFilter(btn.dataset.filter);
  });
});
 
// Apply whichever tab is marked active by default on page load
const defaultFilterBtn = document.querySelector(".filter-btn.active");
if (defaultFilterBtn) applyWorkFilter(defaultFilterBtn.dataset.filter);
 
// ---- Footer year ----
document.getElementById("year").textContent = new Date().getFullYear();
 
// ---- Modal ----
const overlay = document.getElementById("modalOverlay");
const modalCode = document.getElementById("modalCode");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalVideo = document.getElementById("modalVideo");
const modalWhatsapp = document.getElementById("modalWhatsapp");
const modalEmail = document.getElementById("modalEmail");
const modalClose = document.getElementById("modalClose");
 
let lastFocused = null;
 
function openModal(serviceKey) {
  const data = SERVICES[serviceKey];
  if (!data) return;
 
  modalCode.textContent = data.code;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.description;
 
  modalVideo.src = data.video;
 
  modalWhatsapp.href =
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(data.whatsappText);
  modalEmail.href =
    "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("Enquiry: " + data.title);
 
  lastFocused = document.activeElement;
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}
 
function closeModal() {
  overlay.classList.remove("open");
  document.body.style.overflow = "";
  modalVideo.src = "";
}
 
document.querySelectorAll(".service-card").forEach(card => {
  const key = card.getAttribute("data-service");
  card.addEventListener("click", () => openModal(key));
  card.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openModal(key);
    }
  });
});
 
modalClose.addEventListener("click", closeModal);
overlay.addEventListener("click", e => {
  if (e.target === overlay) closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && overlay.classList.contains("open")) closeModal();
});
 
// ---- Work modal (music & video items, YouTube embed) ----
const workOverlay = document.getElementById("workModalOverlay");
const workModalTag = document.getElementById("workModalTag");
const workModalTitle = document.getElementById("workModalTitle");
const workModalDesc = document.getElementById("workModalDesc");
const workModalFrame = document.getElementById("workModalFrame");
const workModalClose = document.getElementById("workModalClose");
 
let lastFocusedWork = null;
 
function openWorkModal(key) {
  const data = WORK_ITEMS[key];
  if (!data) return;
 
  workModalTag.textContent = data.tag;
  workModalTitle.textContent = data.title;
  workModalDesc.textContent = data.description;
  workModalFrame.src = "https://www.youtube.com/embed/" + data.youtubeId;
 
  lastFocusedWork = document.activeElement;
  workOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
  workModalClose.focus();
}
 
function closeWorkModal() {
  workOverlay.classList.remove("open");
  document.body.style.overflow = "";
  workModalFrame.src = ""; // stop playback
  if (lastFocusedWork) lastFocusedWork.focus();
}
 
document.querySelectorAll(".work-item--clickable").forEach(item => {
  const key = item.getAttribute("data-work");
  item.addEventListener("click", () => openWorkModal(key));
  item.addEventListener("keydown", e => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openWorkModal(key);
    }
  });
});
 
workModalClose.addEventListener("click", closeWorkModal);
workOverlay.addEventListener("click", e => {
  if (e.target === workOverlay) closeWorkModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && workOverlay.classList.contains("open")) closeWorkModal();
});
 
// ---- Scroll reveal ----
const revealEls = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach(el => observer.observe(el));