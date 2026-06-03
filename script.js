const root = document.documentElement;

const colorMap = {
  a: "--color-accent",
  b: "--color-ink",
  da: "--color-muted",
  la: "--color-soft",
  w: "--color-paper",
};

function applyPaletteFromHash() {
  const hash = window.location.hash;

  if (!hash.startsWith("#colors:")) {
    return;
  }

  const pairs = hash.replace("#colors:", "").split(";");

  pairs.forEach((pair) => {
    const [key, rawValue] = pair.split("=");
    const variable = colorMap[key];

    if (!variable || !rawValue) {
      return;
    }

    const [h, s, l] = rawValue.split(",").map(Number);

    if ([h, s, l].some((value) => Number.isNaN(value))) {
      return;
    }

    root.style.setProperty(variable, `hsl(${h} ${s}% ${l}%)`);
  });
}

function setupMobileNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#siteNav");

  if (!toggle || !nav) {
    return;
  }

  const closeNav = () => {
    document.body.classList.remove("nav-open");
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    document.body.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeNav();
    }
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNav();
    }
  });
}

function setupPostFilters() {
  const search = document.querySelector("#postSearch");
  const posts = [...document.querySelectorAll(".post-entry")];
  const emptyState = document.querySelector("#emptyState");

  if (!search || !posts.length || !emptyState) {
    return;
  }

  function filterPosts() {
    const searchTerm = search.value.trim().toLowerCase();
    let visibleCount = 0;

    posts.forEach((post) => {
      const matchesSearch = post.textContent.toLowerCase().includes(searchTerm);

      post.classList.toggle("is-hidden", !matchesSearch);

      if (matchesSearch) {
        visibleCount += 1;
      }
    });

    emptyState.hidden = visibleCount !== 0;
  }

  search.addEventListener("input", filterPosts);
  filterPosts();
}

function setupNewsletterForm() {
  const form = document.querySelector("#newsletterForm");
  const email = document.querySelector("#email");
  const message = document.querySelector("#formMessage");

  if (!form || !email || !message) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!email.validity.valid) {
      message.textContent = "Please enter a valid email address.";
      email.focus();
      return;
    }

    message.textContent = "Thank you! You are on the list.";
    form.reset();
  });
}

function setupRevealAnimations() {
  const revealElements = [...document.querySelectorAll("[data-reveal]")];

  if (!revealElements.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

applyPaletteFromHash();
setupMobileNavigation();
setupPostFilters();
setupNewsletterForm();
setupRevealAnimations();
