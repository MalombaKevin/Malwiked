// ============================================================
// MALWIKE TECHNOLOGIES — site interactions
// ============================================================

// ---- Service data (replace video URLs with real clips when ready) ----
const SERVICES = {
  webdev: {
    code: "SERV / 01 — WEB-DEV",
    title: "Web Development",
    description:
      "We design and build fast, responsive websites and web applications — from landing pages to full products. Clean code, thoughtful UX, and performance that holds up on any device.",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    whatsappText: "Hi Malwike Technologies, I'd like to talk about Web Development."
  },
  social: {
    code: "SERV / 02 — SOCIAL",
    title: "Social Media Management",
    description:
      "Strategy, content calendars and day-to-day management that keep your brand consistent, active and growing across every platform — so you can focus on running the business.",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    whatsappText: "Hi Malwike Technologies, I'd like to talk about Social Media Management."
  },
  music: {
    code: "SERV / 03 — MUSIC",
    title: "Custom Music Creation",
    description:
      "Original scores, jingles and soundtracks composed to match your brand's voice — for ads, videos, podcasts and product launches. Every track built from a blank page for you.",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/coffee.mp4",
    whatsappText: "Hi Malwike Technologies, I'd like to talk about Custom Music Creation."
  },
  video: {
    code: "SERV / 04 — VIDEO",
    title: "Video Editing",
    description:
      "Polished, story-driven edits for ads, socials and brand films. We take raw footage and turn it into a finished cut that's ready to publish, on schedule.",
    video: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/octopus.mp4",
    whatsappText: "Hi Malwike Technologies, I'd like to talk about Video Editing."
  }
};

const WHATSAPP_NUMBER = "254759700444"; // TODO: replace with real WhatsApp number
const CONTACT_EMAIL = "malwike.tech@gmail.com"; // TODO: replace with real email

// ---- Our Work data (replace youtubeId with your real video IDs) ----
const WORK_ITEMS = {
  "nairobi-nights": {
    tag: "MUSIC",
    title: "Nairobi Nights",
    description: "An original brand jingle written and produced for a city radio campaign — upbeat, memorable, and built to stick after one listen.",
    youtubeId: "aqz-KE-bpKQ"
  },
  "skyline-coffee": {
    tag: "MUSIC",
    title: "Skyline Coffee",
    description: "A warm, acoustic score composed for a product launch reel, matching the brand's relaxed, unhurried personality.",
    youtubeId: "aqz-KE-bpKQ"
  },
  "launch-day": {
    tag: "VIDEO",
    title: "Launch Day",
    description: "A product film for a first-class travel brand, shot and edited to carry the story from teaser to full reveal.",
    youtubeId: "aqz-KE-bpKQ"
  },
  "behind-the-counter": {
    tag: "VIDEO",
    title: "Behind the Counter",
    description: "A social reel series for a hospitality brand, edited for quick, scroll-stopping storytelling across platforms.",
    youtubeId: "aqz-KE-bpKQ"
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

  modalVideo.pause();
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
  modalVideo.pause();
  modalVideo.removeAttribute("src");
  modalVideo.load();
  if (lastFocused) lastFocused.focus();
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