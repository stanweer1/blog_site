const root = document.documentElement;

const colorMap = {
  a: "--color-accent",
  b: "--color-ink",
  da: "--color-muted",
  la: "--color-wash",
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

function hslVariableToRgba(variableName, alpha) {
  const raw = getComputedStyle(root).getPropertyValue(variableName).trim();
  const match = raw.match(/hsl\(([-\d.]+)\s+([-\d.]+)%\s+([-\d.]+)%\)/);

  if (!match) {
    return `rgba(120, 120, 120, ${alpha})`;
  }

  const hue = ((Number(match[1]) % 360) + 360) % 360;
  const saturation = Number(match[2]) / 100;
  const lightness = Number(match[3]) / 100;
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const secondary = chroma * (1 - Math.abs(((hue / 60) % 2) - 1));
  const matchValue = lightness - chroma / 2;
  let red = 0;
  let green = 0;
  let blue = 0;

  if (hue >= 0 && hue < 60) {
    red = chroma;
    green = secondary;
  } else if (hue >= 60 && hue < 120) {
    red = secondary;
    green = chroma;
  } else if (hue >= 120 && hue < 180) {
    green = chroma;
    blue = secondary;
  } else if (hue >= 180 && hue < 240) {
    green = secondary;
    blue = chroma;
  } else if (hue >= 240 && hue < 300) {
    red = secondary;
    blue = chroma;
  } else {
    red = chroma;
    blue = secondary;
  }

  const toChannel = (value) => Math.round((value + matchValue) * 255);

  return `rgba(${toChannel(red)}, ${toChannel(green)}, ${toChannel(blue)}, ${alpha})`;
}

function setupFluidCanvas() {
  const canvas = document.querySelector("#fluidCanvas");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!canvas || prefersReducedMotion) {
    return;
  }

  const context = canvas.getContext("2d");
  const pointer = {
    x: window.innerWidth * 0.5,
    y: window.innerHeight * 0.5,
  };

  const blobs = [
    { x: 0.14, y: 0.2, r: 0.28, speed: 0.00018, color: "--color-accent", alpha: 0.12 },
    { x: 0.82, y: 0.12, r: 0.24, speed: 0.00014, color: "--color-muted", alpha: 0.14 },
    { x: 0.72, y: 0.78, r: 0.34, speed: 0.00012, color: "--color-wash", alpha: 0.42 },
  ];

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function drawBlob(blob, time, index) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const radius = Math.max(width, height) * blob.r;
    const drift = Math.sin(time * blob.speed + index) * 46;
    const pullX = (pointer.x - width / 2) * 0.018;
    const pullY = (pointer.y - height / 2) * 0.018;
    const x = width * blob.x + drift + pullX * (index + 1);
    const y = height * blob.y + Math.cos(time * blob.speed + index) * 42 + pullY * (index + 1);

    const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
    gradient.addColorStop(0, hslVariableToRgba(blob.color, blob.alpha));
    gradient.addColorStop(0.64, hslVariableToRgba(blob.color, blob.alpha * 0.44));
    gradient.addColorStop(1, hslVariableToRgba(blob.color, 0));

    context.fillStyle = gradient;
    context.beginPath();
    context.ellipse(x, y, radius * 1.14, radius * 0.82, time * blob.speed, 0, Math.PI * 2);
    context.fill();
  }

  function animate(time) {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    blobs.forEach((blob, index) => drawBlob(blob, time, index));
    requestAnimationFrame(animate);
  }

  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  });

  resizeCanvas();
  requestAnimationFrame(animate);
}

function setupMobileNavigation() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#mobileNav");

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
  const chips = [...document.querySelectorAll(".filter-chip")];
  const posts = [...document.querySelectorAll(".post-card")];
  const emptyState = document.querySelector("#emptyState");
  let activeFilter = "all";

  if (!search || !chips.length || !posts.length || !emptyState) {
    return;
  }

  function filterPosts() {
    const searchTerm = search.value.trim().toLowerCase();
    let visibleCount = 0;

    posts.forEach((post) => {
      const topic = post.dataset.topic || "";
      const matchesTopic = activeFilter === "all" || topic === activeFilter;
      const matchesSearch = post.textContent.toLowerCase().includes(searchTerm);
      const isVisible = matchesTopic && matchesSearch;

      post.classList.toggle("is-hidden", !isVisible);

      if (isVisible) {
        visibleCount += 1;
      }
    });

    emptyState.hidden = visibleCount !== 0;
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      activeFilter = chip.dataset.filter || "all";
      chips.forEach((item) => item.classList.toggle("is-active", item === chip));
      filterPosts();
    });
  });

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
setupFluidCanvas();
setupMobileNavigation();
setupPostFilters();
setupNewsletterForm();
setupRevealAnimations();
