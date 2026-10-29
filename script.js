const episodes = [
  {
    no: "00",
    title: "Dear You, Before We Begin",
    meta: "June 28 · 4 min · Opening letter",
    category: "begin",
    description: "A welcome into the heart of Love Always, Myles—and an invitation to enter a space where neither of us has to pretend."
  },
  {
    no: "01",
    title: "Before We Talk About Love… Let’s Talk About You",
    meta: "July 5 · Season premiere",
    category: "begin",
    description: "Before we examine how we love others, we begin with the person bringing their whole history, hope, and heart into the room: you."
  },
  {
    no: "02",
    title: "Why It’s So Hard to Let Go (Even When You Know)",
    meta: "July 12 · 6 min · Letting go",
    category: "love",
    description: "A conversation about attachment, familiarity, grief, and giving your heart time to catch up with what you already know."
  },
  {
    no: "03",
    title: "You Don’t Have to Perform Here",
    meta: "July 19 · 15 min · Emotional safety",
    category: "begin",
    description: "A reminder that you do not have to earn softness, safety, or love by pretending to be okay or becoming who everyone expects."
  },
  {
    no: "04",
    title: "The Way You Love Was Learned",
    meta: "July 26 · 18 min · Love patterns",
    category: "love",
    description: "An honest reflection on how our earliest experiences shape the way we give, receive, tolerate, and understand love."
  },
  {
    no: "05",
    title: "Made Over from Broken Pieces",
    meta: "August 2 · 30 min · Rebuilding",
    category: "becoming",
    description: "On rebuilding yourself after heartbreak, grief, and disappointment—and trusting that being changed does not mean being ruined."
  },
  {
    no: "06",
    title: "Stop Running from What Your Soul Keeps Pulling You Toward",
    meta: "August 9 · 28 min · Purpose",
    category: "becoming",
    description: "A call to move toward the life that keeps calling your name, even before fear is gone or certainty arrives."
  },
  {
    no: "07",
    title: "The Courage to Keep Becoming",
    meta: "August 16 · 26 min · Courage",
    category: "becoming",
    description: "A reflection on the quiet bravery of choosing yourself when growth feels slow, uncertain, unseen, or lonely."
  },
  {
    no: "08",
    title: "You Can’t Take Every Version of You into the Next Season",
    meta: "August 23 · 22 min · Releasing",
    category: "becoming",
    description: "Honor the versions of you that survived—and make room to release the habits, fears, and patterns that cannot follow you forward."
  },
  {
    no: "09",
    title: "Trusting Yourself Again",
    meta: "August 30 · 22 min · Self-trust",
    category: "becoming",
    description: "Self-trust is not never getting it wrong. It is learning to listen to yourself with more honesty, compassion, and courage."
  },
  {
    no: "10",
    title: "The Person You’re Becoming Is Already Here",
    meta: "September 6 · 22 min · Season finale",
    category: "becoming",
    description: "The season closes with a truth: maybe the version of you that you have been chasing is already here, beneath fear and expectation."
  }
];

const letters = [
  "You are allowed to become unfamiliar to the people who only knew the version of you that survived. Growing may change what you can carry, tolerate, or return to. That does not make you cold. It means you are learning to honor the life you are trying to build.",
  "Not every quiet season means you are stuck. Some seasons are teaching your roots what your future will require. Give yourself permission to grow where no one can applaud you yet.",
  "You do not have to chase clarity from people committed to being unclear. Sometimes peace begins when you believe the pattern, honor what it is doing to you, and stop abandoning yourself to keep hope alive.",
  "You can be soft and still have boundaries. You can love deeply and still choose yourself. Tenderness was never the opposite of strength—it is one of the bravest ways to live."
];

const episodeList = document.querySelector("[data-episode-list]");
const emptyState = document.querySelector("[data-empty-state]");
const searchInput = document.querySelector("[data-episode-search]");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
let activeFilter = "all";

function renderEpisodes() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = episodes.filter((episode) => {
    const matchesFilter = activeFilter === "all" || episode.category === activeFilter;
    const matchesSearch = `${episode.title} ${episode.meta} ${episode.description}`.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  episodeList.innerHTML = visible.map((episode) => `
    <button class="episode-card" type="button" data-episode="${episode.no}" aria-label="Open episode ${episode.no}: ${episode.title}">
      <span class="episode-no">EP. ${episode.no}</span>
      <span class="episode-main">
        <h3>${episode.title}</h3>
        <p>${episode.meta}</p>
      </span>
      <span class="episode-arrow" aria-hidden="true">↗</span>
    </button>
  `).join("");

  emptyState.hidden = visible.length !== 0;
  document.querySelectorAll("[data-episode]").forEach((card) => {
    card.addEventListener("click", () => openEpisode(card.dataset.episode));
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderEpisodes();
  });
});
searchInput.addEventListener("input", renderEpisodes);
renderEpisodes();

const listenModal = document.querySelector("[data-listen-modal]");
document.querySelectorAll("[data-open-listen]").forEach((button) => button.addEventListener("click", () => listenModal.showModal()));
document.querySelector("[data-close-listen]").addEventListener("click", () => listenModal.close());

const episodeModal = document.querySelector("[data-episode-modal]");
function openEpisode(number) {
  const episode = episodes.find((item) => item.no === number);
  document.querySelector("[data-modal-kicker]").textContent = `Season One · Episode ${episode.no}`;
  document.querySelector("[data-modal-title]").textContent = episode.title;
  document.querySelector("[data-modal-description]").textContent = episode.description;
  episodeModal.showModal();
}
document.querySelector("[data-close-episode]").addEventListener("click", () => episodeModal.close());

[listenModal, episodeModal].forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) modal.close();
  });
});

const letterText = document.querySelector("[data-letter-text]");
const letterIndex = document.querySelector("[data-letter-index]");
const letterDots = document.querySelector("[data-letter-dots]");
let currentLetter = 0;

function renderLetter() {
  letterText.textContent = letters[currentLetter];
  letterIndex.textContent = `${String(currentLetter + 1).padStart(2, "0")} / ${String(letters.length).padStart(2, "0")}`;
  [...letterDots.children].forEach((dot, index) => dot.classList.toggle("is-active", index === currentLetter));
}

letters.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.type = "button";
  dot.setAttribute("aria-label", `Show Dear You letter ${index + 1}`);
  dot.addEventListener("click", () => { currentLetter = index; renderLetter(); });
  letterDots.appendChild(dot);
});
document.querySelector("[data-letter-prev]").addEventListener("click", () => { currentLetter = (currentLetter - 1 + letters.length) % letters.length; renderLetter(); });
document.querySelector("[data-letter-next]").addEventListener("click", () => { currentLetter = (currentLetter + 1) % letters.length; renderLetter(); });
renderLetter();

const signupModal = document.querySelector("[data-signup-modal]");

function openSignup() {
  if (!signupModal.open) signupModal.showModal();
}

document.querySelectorAll("[data-open-signup]").forEach((button) => button.addEventListener("click", openSignup));
document.querySelectorAll("[data-close-signup]").forEach((button) => button.addEventListener("click", () => signupModal.close()));
signupModal.addEventListener("click", (event) => {
  if (event.target === signupModal) signupModal.close();
});
document.querySelectorAll("[data-community-interest]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("[data-community-status]").textContent = "We’ve noted your interest for this preview. Join the email list to hear when community plans go live.";
    openSignup();
  });
});

const questionForm = document.querySelector("[data-question-form]");
questionForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const status = document.querySelector("[data-question-status]");
  const submitButton = document.querySelector("[data-question-submit]");
  status.textContent = "Sending your question…";
  submitButton.disabled = true;

  try {
    const response = await fetch(questionForm.action, {
      method: "POST",
      body: new FormData(questionForm),
      headers: { Accept: "application/json" }
    });

    if (!response.ok) throw new Error("Submission failed");
    questionForm.reset();
    status.textContent = "Your question has been sent. Thank you for trusting this space.";
  } catch (error) {
    status.textContent = "Your question could not be sent. Please try again in a moment.";
  } finally {
    submitButton.disabled = false;
  }
});

window.setTimeout(() => {
  if (!sessionStorage.getItem("lam-signup-seen")) {
    sessionStorage.setItem("lam-signup-seen", "true");
    openSignup();
  }
}, 850);

const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 24), { passive: true });
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  nav.classList.toggle("is-open", !open);
});
nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
  menuToggle.setAttribute("aria-expanded", "false");
  nav.classList.remove("is-open");
  document.querySelector("[data-season-menu]")?.removeAttribute("open");
}));

const contactEmail = "lovealwaysmyles@gmail.com";
const workStatus = document.querySelector("[data-work-status]");

async function copyContactEmail(context = "inquiry") {
  try {
    await navigator.clipboard.writeText(contactEmail);
  } catch (error) {
    const helper = document.createElement("textarea");
    helper.value = contactEmail;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    document.execCommand("copy");
    helper.remove();
  }
  workStatus.textContent = `Email copied for your ${context}. If your email app did not open, paste it into a new message.`;
}

document.querySelectorAll("[data-contact-link]").forEach((link) => {
  link.addEventListener("click", () => copyContactEmail(link.dataset.contactType));
});
document.querySelector("[data-copy-email]")?.addEventListener("click", () => copyContactEmail("message"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
